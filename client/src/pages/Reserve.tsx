import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCheckoutSession } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Reserve() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const params = new URLSearchParams(location.split('?')[1]);
  const roomId = params.get('roomId');
  const checkIn = params.get('checkIn');
  const checkOut = params.get('checkOut');
  const guestsCount = params.get('guests') || '2';

  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
  });
  const [boardOption, setBoardOption] = useState<string>('');

  const { data: room } = useQuery({
    queryKey: [`/api/rooms`],
    select: (rooms: any[]) => rooms.find(r => r._id === roomId),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (!roomId || !checkIn || !checkOut) {
      toast({
        title: "Missing Information",
        description: "Please select a room and dates first",
        variant: "destructive",
      });
    }
  }, [roomId, checkIn, checkOut]);

  const calculateTotal = () => {
    if (!room || !checkIn || !checkOut) return 0;

    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );

    let total = room.basePrice * nights;

    if (boardOption && room.boardOptions?.[boardOption as keyof typeof room.boardOptions]) {
      total += room.boardOptions[boardOption as keyof typeof room.boardOptions] * nights;
    }

    return total / 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestInfo.fullName || !guestInfo.email || !guestInfo.phone || !guestInfo.nationality) {
      toast({
        title: "Missing Information",
        description: "Please fill in all guest information",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await createCheckoutSession({
        roomId: roomId!,
        checkIn: checkIn!,
        checkOut: checkOut!,
        guestsCount: parseInt(guestsCount),
        guestInfo,
        boardOption: boardOption || undefined,
      });

      // Redirect to Stripe Checkout
      if (result.sessionUrl) {
        window.location.href = result.sessionUrl;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create reservation. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-20">
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl font-bold mb-8 text-center">
              Complete Your Reservation
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Guest Information</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={guestInfo.fullName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                        placeholder="John Doe"
                        required
                        data-testid="input-guest-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        required
                        data-testid="input-guest-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        required
                        data-testid="input-guest-phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Input
                        id="nationality"
                        value={guestInfo.nationality}
                        onChange={(e) => setGuestInfo({ ...guestInfo, nationality: e.target.value })}
                        placeholder="USA"
                        required
                        data-testid="input-guest-nationality"
                      />
                    </div>

                    {room.boardOptions && (
                      <div className="space-y-2">
                        <Label htmlFor="board">Board Option (Optional)</Label>
                        <Select value={boardOption} onValueChange={setBoardOption}>
                          <SelectTrigger data-testid="select-board-option">
                            <SelectValue placeholder="Room Only" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Room Only</SelectItem>
                            {room.boardOptions.BB && (
                              <SelectItem value="BB">Bed & Breakfast (+${(room.boardOptions.BB / 100).toFixed(2)}/night)</SelectItem>
                            )}
                            {room.boardOptions.HB && (
                              <SelectItem value="HB">Half Board (+${(room.boardOptions.HB / 100).toFixed(2)}/night)</SelectItem>
                            )}
                            {room.boardOptions.FB && (
                              <SelectItem value="FB">Full Board (+${(room.boardOptions.FB / 100).toFixed(2)}/night)</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full rounded-xl mt-6"
                      size="lg"
                      data-testid="button-proceed-payment"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Proceed to Payment - $${calculateTotal().toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Card>
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                <Card className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-4">Booking Summary</h3>
                  
                  <div className="space-y-3 text-sm mb-4">
                    <div>
                      <p className="font-semibold">{room.title}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span>{new Date(checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span>{new Date(checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nights</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span>{guestsCount}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Room ({nights} nights)</span>
                      <span>${((room.basePrice * nights) / 100).toFixed(2)}</span>
                    </div>
                    {boardOption && room.boardOptions?.[boardOption as keyof typeof room.boardOptions] && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Board Option ({nights} nights)</span>
                        <span>${((room.boardOptions[boardOption as keyof typeof room.boardOptions] * nights) / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
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
