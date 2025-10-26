import { RoomCard } from "./RoomCard";
import deluxeRoomImage from "@assets/generated_images/Deluxe_room_interior_9745000a.png";
import suiteImage from "@assets/generated_images/Executive_suite_interior_db51f9c0.png";
import familyRoomImage from "@assets/generated_images/Family_room_interior_8f0c3a6a.png";

const rooms = [
  {
    title: "Deluxe Ocean View",
    slug: "deluxe-ocean-view",
    description: "Spacious room with stunning ocean views, king-size bed, and modern amenities for the perfect romantic getaway.",
    image: deluxeRoomImage,
    price: 299,
    capacity: 2,
    beds: 1,
    amenities: ["Ocean View", "WiFi", "Mini Bar", "Smart TV", "Balcony"],
  },
  {
    title: "Executive Suite",
    slug: "executive-suite",
    description: "Luxurious suite featuring separate living area, premium furnishings, and panoramic ocean views from your private terrace.",
    image: suiteImage,
    price: 499,
    capacity: 4,
    beds: 1,
    amenities: ["Ocean View", "Living Room", "Terrace", "Jacuzzi", "Workspace"],
  },
  {
    title: "Family Paradise",
    slug: "family-paradise",
    description: "Perfect for families with spacious accommodations, two queen beds, and child-friendly amenities for memorable vacations.",
    image: familyRoomImage,
    price: 379,
    capacity: 4,
    beds: 2,
    amenities: ["Beach View", "WiFi", "Kitchenette", "Game Console", "Extra Space"],
  },
];

export function FeaturedRooms() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Featured Accommodations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated rooms and suites, each designed to provide the ultimate in comfort and luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.slug} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
}
