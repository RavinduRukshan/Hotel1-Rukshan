import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Luxury_hotel_hero_image_12901ecf.png";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 py-20">
          <div className="flex-1 text-white max-w-2xl">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Where Luxury Meets Paradise
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Escape to an oasis of tranquility and elegance. Experience world-class hospitality, breathtaking ocean views, and unforgettable moments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/rooms">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 rounded-full"
                  data-testid="button-explore-rooms"
                >
                  Explore Rooms
                </Button>
              </Link>
              <a href="#gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                  data-testid="button-view-gallery"
                >
                  View Gallery
                </Button>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">
                Quick Rates
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-white">
                  <span className="text-white/80">Deluxe Room</span>
                  <span className="font-semibold text-lg">$299/night</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-white/80">Executive Suite</span>
                  <span className="font-semibold text-lg">$499/night</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-white/80">Family Room</span>
                  <span className="font-semibold text-lg">$379/night</span>
                </div>
              </div>
              <Link href="/rooms">
                <Button
                  className="w-full text-base py-6 rounded-xl"
                  size="lg"
                  data-testid="button-check-availability"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Check Availability
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-card border-t border-border p-4 z-50">
        <Link href="/rooms">
          <Button
            className="w-full text-base py-6 rounded-xl"
            size="lg"
            data-testid="button-check-availability-mobile"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Check Availability
          </Button>
        </Link>
      </div>
    </section>
  );
}
