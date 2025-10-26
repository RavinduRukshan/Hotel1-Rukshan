import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Room from '../models/Room';
import AdminUser from '../models/AdminUser';
import Reservation from '../models/Reservation';

const MONGODB_URI = process.env.MONGODB_URI || '';

const rooms = [
  {
    title: 'Deluxe Ocean View',
    slug: 'deluxe-ocean-view',
    description: 'Spacious room with stunning ocean views, king-size bed, and modern amenities for the perfect romantic getaway.',
    capacity: 2,
    beds: 1,
    amenities: ['Ocean View', 'WiFi', 'Mini Bar', 'Smart TV', 'Balcony', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    ],
    basePrice: 29900, // $299.00 in cents
    boardOptions: {
      FB: 5000, // Full Board +$50
      HB: 3000, // Half Board +$30
      BB: 1500, // Bed & Breakfast +$15
    },
  },
  {
    title: 'Executive Suite',
    slug: 'executive-suite',
    description: 'Luxurious suite featuring separate living area, premium furnishings, and panoramic ocean views from your private terrace.',
    capacity: 4,
    beds: 1,
    amenities: ['Ocean View', 'Living Room', 'Terrace', 'Jacuzzi', 'Workspace', 'WiFi', 'Mini Bar'],
    images: [
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
    ],
    basePrice: 49900, // $499.00
    boardOptions: {
      FB: 7500,
      HB: 5000,
      BB: 2500,
    },
  },
  {
    title: 'Family Paradise',
    slug: 'family-paradise',
    description: 'Perfect for families with spacious accommodations, two queen beds, and child-friendly amenities for memorable vacations.',
    capacity: 4,
    beds: 2,
    amenities: ['Beach View', 'WiFi', 'Kitchenette', 'Game Console', 'Extra Space', 'Connecting Rooms'],
    images: [
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
    ],
    basePrice: 37900, // $379.00
    boardOptions: {
      FB: 6000,
      HB: 4000,
      BB: 2000,
    },
  },
  {
    title: 'Romantic Honeymoon Suite',
    slug: 'romantic-honeymoon-suite',
    description: 'Intimate suite designed for romance with private pool, champagne service, and unforgettable sunset views.',
    capacity: 2,
    beds: 1,
    amenities: ['Private Pool', 'Champagne Service', 'Ocean View', 'Romantic Decor', 'Couples Spa', 'WiFi'],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    ],
    basePrice: 59900, // $599.00
    boardOptions: {
      FB: 8000,
      HB: 5500,
      BB: 3000,
    },
  },
  {
    title: 'Budget Double Room',
    slug: 'budget-double-room',
    description: 'Comfortable and affordable room with essential amenities, perfect for budget-conscious travelers.',
    capacity: 2,
    beds: 1,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Garden View'],
    images: [
      'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
    ],
    basePrice: 19900, // $199.00
    boardOptions: {
      FB: 4000,
      HB: 2500,
      BB: 1000,
    },
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Room.deleteMany({});
    await AdminUser.deleteMany({});
    await Reservation.deleteMany({});

    // Seed rooms
    console.log('📦 Seeding rooms...');
    const createdRooms = await Room.insertMany(rooms);
    console.log(`✅ Created ${createdRooms.length} rooms`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const passwordHash = await bcrypt.hash('Admin123!', 10);
    await AdminUser.create({
      email: 'admin@example.com',
      passwordHash,
      name: 'Admin User',
      role: 'admin',
    });
    console.log('✅ Created admin user (admin@example.com / Admin123!)');

    // Create sample reservations
    console.log('📅 Creating sample reservations...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);

    const sampleReservations = [
      {
        reservationId: 'RES-SAMPLE-001',
        room: createdRooms[0]._id,
        guest: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          nationality: 'USA',
        },
        checkIn: tomorrow,
        checkOut: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000),
        nights: 3,
        guestsCount: 2,
        boardOption: 'BB',
        totalAmount: 94200, // 3 nights * $299 + 3 * $15
        currency: 'USD',
        paymentStatus: 'paid',
        status: 'confirmed',
      },
      {
        reservationId: 'RES-SAMPLE-002',
        room: createdRooms[1]._id,
        guest: {
          fullName: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1987654321',
          nationality: 'Canada',
        },
        checkIn: nextWeek,
        checkOut: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
        nights: 5,
        guestsCount: 2,
        boardOption: 'FB',
        totalAmount: 287000, // 5 nights * $499 + 5 * $75
        currency: 'USD',
        paymentStatus: 'pending',
        status: 'pending',
      },
    ];

    await Reservation.insertMany(sampleReservations);
    console.log(`✅ Created ${sampleReservations.length} sample reservations`);

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: Admin123!');
    console.log('\n⚠️  Please change the admin password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
