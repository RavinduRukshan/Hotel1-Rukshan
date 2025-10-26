import Reservation from '../models/Reservation';
import Room, { IRoom } from '../models/Room';

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function datesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && start2 < end1;
}

export async function checkRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): Promise<boolean> {
  const conflictingReservations = await Reservation.find({
    room: roomId,
    status: { $nin: ['cancelled'] },
    $or: [
      {
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
      },
    ],
  });

  return conflictingReservations.length === 0;
}

export function calculateTotalPrice(
  room: IRoom,
  nights: number,
  boardOption?: string
): number {
  let total = room.basePrice * nights;

  if (boardOption && room.boardOptions) {
    const boardPrice = room.boardOptions[boardOption as keyof typeof room.boardOptions];
    if (boardPrice) {
      total += boardPrice * nights;
    }
  }

  return total;
}

export function generateReservationId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `RES-${timestamp}-${randomStr}`.toUpperCase();
}
