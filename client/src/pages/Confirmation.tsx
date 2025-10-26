import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReservationBySessionId } from "@/lib/api";
import { Loader2, CheckCircle, Calendar, Users, MapPin, Mail, Phone } from "lucide-react";

export default function Confirmation() {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const sessionId = params.get('session_id');

  const { data: reservation, isLoading } = useQuery({
    queryKey: [`/api/reservations/session/${sessionId}`],
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (!sessionId) {
      setLocation('/');
    }
  }, [sessionId, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Reservation not found</p>
      </div>
    );
  }

  const room = reservation.room as any;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-20">
        <section className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="font-serif text-4xl font-bold mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your reservation has been successfully confirmed
              </p>
            </div>

            <Card className="p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reservation ID</p>
                  <p className="text-xl font-bold" data-testid="text-reservation-id">{reservation.reservationId}</p>
                </div>
                <Badge className="text-base px-4 py-2">
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </Badge>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <h2 className="font-serif text-2xl font-semibold mb-4">{room.title}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in</p>
                      <p className="font-medium">{new Date(reservation.checkIn).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-out</p>
                      <p className="font-medium">{new Date(reservation.checkOut).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <p className="font-medium">{reservation.guestsCount} {reservation.guestsCount === 1 ? 'guest' : 'guests'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nights</p>
                      <p className="font-medium">{reservation.nights} {reservation.nights === 1 ? 'night' : 'nights'}</p>
                    </div>
                  </div>
                </div>

                {reservation.boardOption && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Board Option</p>
                    <Badge variant="secondary">
                      {reservation.boardOption === 'BB' && 'Bed & Breakfast'}
                      {reservation.boardOption === 'HB' && 'Half Board'}
                      {reservation.boardOption === 'FB' && 'Full Board'}
                    </Badge>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount Paid</span>
                    <span className="text-2xl font-bold">${(reservation.totalAmount / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Guest Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.guest.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.guest.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.guest.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.guest.nationality}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• A confirmation email has been sent to {reservation.guest.email}</li>
                <li>• Please present your reservation ID upon check-in</li>
                <li>• Check-in time is from 3:00 PM onwards</li>
                <li>• Check-out time is before 11:00 AM</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setLocation('/')}
                variant="default"
                className="flex-1 rounded-xl"
                data-testid="button-back-home"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 rounded-xl"
                data-testid="button-print"
              >
                Print Confirmation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
