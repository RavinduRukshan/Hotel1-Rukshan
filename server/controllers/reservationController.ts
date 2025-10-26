import { Request, Response } from 'express';
import Stripe from 'stripe';
import Reservation from '../models/Reservation';
import Room from '../models/Room';
import {
  checkRoomAvailability,
  calculateNights,
  calculateTotalPrice,
  generateReservationId,
} from '../utils/availability';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { roomId, checkIn, checkOut, guestsCount, guestInfo, boardOption } = req.body;

    if (!roomId || !checkIn || !checkOut || !guestsCount || !guestInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const isAvailable = await checkRoomAvailability(
      roomId,
      checkInDate,
      checkOutDate
    );

    if (!isAvailable) {
      return res.status(400).json({ error: 'Room not available for selected dates' });
    }

    const nights = calculateNights(checkInDate, checkOutDate);
    const totalAmount = calculateTotalPrice(room, nights, boardOption);

    const reservationId = generateReservationId();

    const reservation = await Reservation.create({
      reservationId,
      room: roomId,
      guest: guestInfo,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      guestsCount,
      boardOption,
      totalAmount,
      currency: 'USD',
      paymentStatus: 'pending',
      status: 'pending',
    });

    const baseUrl = process.env.CLIENT_BASE_URL || 'http://localhost:5000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${room.title} - ${nights} night${nights > 1 ? 's' : ''}`,
              description: `Check-in: ${checkInDate.toLocaleDateString()}, Check-out: ${checkOutDate.toLocaleDateString()}`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/reserve?canceled=true`,
      metadata: {
        reservationId: reservation._id.toString(),
      },
    });

    await Reservation.findByIdAndUpdate((reservation._id as any), {
      stripeSessionId: session.id,
    });

    res.json({
      sessionId: session.id,
      sessionUrl: session.url,
      reservationId: reservation.reservationId,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const reservationId = session.metadata?.reservationId;

      if (reservationId) {
        await Reservation.findByIdAndUpdate(reservationId, {
          paymentStatus: 'paid',
          status: 'confirmed',
          stripePaymentIntentId: session.payment_intent as string,
        });

        console.log(`✅ Reservation ${reservationId} confirmed and paid`);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
}

export async function getReservationBySessionId(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;

    const reservation = await Reservation.findOne({
      stripeSessionId: sessionId,
    }).populate('room');

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
}
