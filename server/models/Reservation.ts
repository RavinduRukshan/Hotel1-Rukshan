import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  reservationId: string;
  room: mongoose.Types.ObjectId;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  checkIn: Date;
  checkOut: Date;
  nights: number;
  guestsCount: number;
  boardOption?: string;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  meta?: any;
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema: Schema = new Schema(
  {
    reservationId: { type: String, required: true, unique: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    guest: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      nationality: { type: String, required: true },
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    guestsCount: { type: Number, required: true },
    boardOption: { type: String },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    stripePaymentIntentId: { type: String },
    stripeSessionId: { type: String },
    meta: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'checked_in', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
