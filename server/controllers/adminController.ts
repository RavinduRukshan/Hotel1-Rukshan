import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser';
import Reservation from '../models/Reservation';
import Room from '../models/Room';
import { AuthRequest } from '../middleware/auth';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ adminId: admin._id }, jwtSecret, {
      expiresIn: '1d',
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getAllReservations(req: AuthRequest, res: Response) {
  try {
    const { status, search, startDate, endDate } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { reservationId: { $regex: search, $options: 'i' } },
        { 'guest.fullName': { $regex: search, $options: 'i' } },
        { 'guest.email': { $regex: search, $options: 'i' } },
      ];
    }

    if (startDate || endDate) {
      query.checkIn = {};
      if (startDate) query.checkIn.$gte = new Date(startDate as string);
      if (endDate) query.checkIn.$lte = new Date(endDate as string);
    }

    const reservations = await Reservation.find(query)
      .populate('room')
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
}

export async function getReservationById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id).populate('room');

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
}

export async function updateReservationStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'checked_in', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('room');

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Failed to update reservation' });
  }
}

export async function exportReservationsCSV(req: AuthRequest, res: Response) {
  try {
    const { startDate, endDate } = req.query;

    const query: any = {};
    if (startDate || endDate) {
      query.checkIn = {};
      if (startDate) query.checkIn.$gte = new Date(startDate as string);
      if (endDate) query.checkIn.$lte = new Date(endDate as string);
    }

    const reservations = await Reservation.find(query).populate('room');

    const csvHeader = 'Reservation ID,Guest Name,Email,Phone,Room,Check-In,Check-Out,Nights,Guests,Total Amount,Payment Status,Status,Created At\n';
    
    const csvRows = reservations.map(r => {
      const room = r.room as any;
      return [
        r.reservationId,
        r.guest.fullName,
        r.guest.email,
        r.guest.phone,
        room?.title || 'N/A',
        r.checkIn.toLocaleDateString(),
        r.checkOut.toLocaleDateString(),
        r.nights,
        r.guestsCount,
        `$${(r.totalAmount / 100).toFixed(2)}`,
        r.paymentStatus,
        r.status,
        r.createdAt.toLocaleDateString(),
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=reservations-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
}

export async function createRoom(req: AuthRequest, res: Response) {
  try {
    const roomData = req.body;
    const room = await Room.create(roomData);
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
}

export async function updateRoom(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const room = await Room.findByIdAndUpdate(id, updates, { new: true });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
}

export async function deleteRoom(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
}
