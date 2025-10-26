import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  title: string;
  slug: string;
  description: string;
  capacity: number;
  beds: number;
  amenities: string[];
  images: string[];
  basePrice: number;
  boardOptions?: {
    FB?: number;
    HB?: number;
    BB?: number;
  };
  blockedDates?: Date[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    beds: { type: Number, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    basePrice: { type: Number, required: true },
    boardOptions: {
      FB: Number,
      HB: Number,
      BB: Number,
    },
    blockedDates: [{ type: Date }],
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>('Room', RoomSchema);
