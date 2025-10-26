const API_BASE = '/api';

export interface Room {
  _id: string;
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
}

export interface Reservation {
  _id: string;
  reservationId: string;
  room: Room;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  boardOption?: string;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

export async function fetchRooms(): Promise<Room[]> {
  const response = await fetch(`${API_BASE}/rooms`);
  if (!response.ok) throw new Error('Failed to fetch rooms');
  return response.json();
}

export async function fetchRoomBySlug(slug: string): Promise<Room> {
  const response = await fetch(`${API_BASE}/rooms/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch room');
  return response.json();
}

export async function checkAvailability(data: {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomSlug?: string;
}) {
  const response = await fetch(`${API_BASE}/availability/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to check availability');
  return response.json();
}

export async function createCheckoutSession(data: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  boardOption?: string;
}) {
  const response = await fetch(`${API_BASE}/reservations/create-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create checkout session');
  return response.json();
}

export async function getReservationBySessionId(sessionId: string): Promise<Reservation> {
  const response = await fetch(`${API_BASE}/reservations/session/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch reservation');
  return response.json();
}

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function getAdminReservations(token: string, filters?: {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Reservation[]> {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_BASE}/admin/reservations?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch reservations');
  return response.json();
}

export async function updateReservationStatus(
  token: string,
  id: string,
  status: string
): Promise<Reservation> {
  const response = await fetch(`${API_BASE}/admin/reservations/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update reservation');
  return response.json();
}
