import { Request, Response } from 'express';
import Room from '../models/Room';
import {
  checkRoomAvailability,
  calculateNights,
  calculateTotalPrice,
} from '../utils/availability';

export async function getAllRooms(req: Request, res: Response) {
  try {
    const { capacity, minPrice, maxPrice } = req.query;

    const query: any = {};

    if (capacity) {
      query.capacity = { $gte: parseInt(capacity as string) };
    }

    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = parseInt(minPrice as string);
      if (maxPrice) query.basePrice.$lte = parseInt(maxPrice as string);
    }

    const rooms = await Room.find(query).sort({ basePrice: 1 });
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
}

export async function getRoomBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const room = await Room.findOne({ slug });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
}

export async function checkAvailability(req: Request, res: Response) {
  try {
    const { checkIn, checkOut, guests, roomSlug } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ error: 'Check-in and check-out dates are required' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ error: 'Check-out must be after check-in' });
    }

    const nights = calculateNights(checkInDate, checkOutDate);

    let query: any = {};
    if (roomSlug) {
      query.slug = roomSlug;
    }
    if (guests) {
      query.capacity = { $gte: parseInt(guests) };
    }

    const rooms = await Room.find(query);
    const availableRooms = [];

    for (const room of rooms) {
      const isAvailable = await checkRoomAvailability(
        (room._id as any).toString(),
        checkInDate,
        checkOutDate
      );

      if (isAvailable) {
        const totalPrice = calculateTotalPrice(room, nights);
        availableRooms.push({
          room,
          priceBreakdown: {
            basePrice: room.basePrice,
            nights,
            totalPrice,
            currency: 'USD',
          },
        });
      }
    }

    res.json({
      available: availableRooms.length > 0,
      rooms: availableRooms,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
}
