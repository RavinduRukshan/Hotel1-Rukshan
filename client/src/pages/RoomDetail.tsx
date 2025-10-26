import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchRoomBySlug, checkAvailability } from "@/lib/api";
import { Calendar, Users, Bed, Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RoomDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const { data: room, isLoading } = useQuery({
    queryKey: [`/api/rooms/${slug}`],
    enabled: !!slug,
  });

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }

    setCheckingAvailability(true);
    try {
      const result = await checkAvailability({
        checkIn,
        checkOut,
        guests: parseInt(guests),
        roomSlug: slug,
      });

      if (result.available && result.rooms.length > 0) {
        toast({
          title: "Room Available!",
          description: `This room is available for your selected dates. Total: $${(result.rooms[0].priceBreakdown.totalPrice / 100).toFixed(2)}`,
        });
        
        // Navigate to booking page with pre-filled data
        setLocation(`/reserve?roomId=${room._id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
      } else {
        toast({
          title: "Not Available",
          description: "This room is not available for your selected dates. Please try different dates.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckingAvailability(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Room not found</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group">
                  <img
                    src={room.images[currentImageIndex]}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  {room.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={prevImage}
                        data-testid="button-prev-room-image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={nextImage}
                        data-testid="button-next-room-image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>

                <h1 className="font-serif text-4xl font-bold mb-4">{room.title}</h1>

                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bed className="h-5 w-5" />
                    <span>{room.beds} {room.beds === 1 ? 'bed' : 'beds'}</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  {room.description}
                </p>

                <Card className="p-6 mb-8">
                  <h2 className="font-serif text-2xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {room.boardOptions && (
                  <Card className="p-6">
                    <h2 className="font-serif text-2xl font-semibold mb-4">Board Options</h2>
                    <div className="space-y-3">
                      {room.boardOptions.BB && (
                        <div className="flex justify-between items-center">
                          <span>Bed & Breakfast</span>
                          <Badge variant="secondary">+${(room.boardOptions.BB / 100).toFixed(2)}/night</Badge>
                        </div>
                      )}
                      {room.boardOptions.HB && (
                        <div className="flex justify-between items-center">
                          <span>Half Board (Breakfast & Dinner)</span>
                          <Badge variant="secondary">+${(room.boardOptions.HB / 100).toFixed(2)}/night</Badge>
                        </div>
                      )}
                      {room.boardOptions.FB && (
                        <div className="flex justify-between items-center">
                          <span>Full Board (All Meals)</span>
                          <Badge variant="secondary">+${(room.boardOptions.FB / 100).toFixed(2)}/night</Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <Card className="p-6 shadow-xl">
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-1">
                      ${(room.basePrice / 100).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Check In</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="check-in"
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-10"
                          data-testid="input-check-in-detail"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="check-out">Check Out</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="check-out"
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="pl-10"
                          data-testid="input-check-out-detail"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">Guests</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger data-testid="select-guests-detail">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckAvailability}
                    disabled={checkingAvailability}
                    className="w-full rounded-xl"
                    size="lg"
                    data-testid="button-check-and-book"
                  >
                    {checkingAvailability ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check Availability & Book"
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
