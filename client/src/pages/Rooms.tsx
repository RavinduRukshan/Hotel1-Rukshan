import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { BookingWidget } from "@/components/BookingWidget";
import { fetchRooms } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function Rooms() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['/api/rooms'],
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
                Our Rooms & Suites
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our carefully curated selection of luxurious accommodations, each designed for your comfort and relaxation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rooms?.map((room: any) => (
                      <Link key={room.slug} href={`/rooms/${room.slug}`}>
                        <a>
                          <RoomCard
                            title={room.title}
                            description={room.description}
                            image={room.images[0]}
                            price={room.basePrice / 100}
                            capacity={room.capacity}
                            beds={room.beds}
                            amenities={room.amenities}
                            slug={room.slug}
                          />
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <BookingWidget />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
