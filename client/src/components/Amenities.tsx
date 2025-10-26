import { AmenityCard } from "./AmenityCard";
import { Waves, Utensils, Dumbbell, Wifi, Car, Sparkles } from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Relax in our stunning infinity pool with panoramic ocean views and poolside service.",
  },
  {
    icon: Sparkles,
    title: "Luxury Spa",
    description: "Rejuvenate your body and mind with our world-class spa treatments and wellness programs.",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Experience culinary excellence at our award-winning restaurants featuring international cuisine.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Stay active with our state-of-the-art gym equipped with modern fitness equipment.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Enjoy complimentary high-speed internet access throughout the entire property.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Convenient valet parking service available 24/7 for all our valued guests.",
  },
];

export function Amenities() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for an unforgettable stay, from relaxation to adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.title} {...amenity} />
          ))}
        </div>
      </div>
    </section>
  );
}
