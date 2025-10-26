import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Users, Search } from "lucide-react";

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    console.log("Searching availability:", { checkIn, checkOut, guests });
  };

  return (
    <Card className="p-6 shadow-xl">
      <h3 className="font-serif text-2xl font-semibold mb-6">
        Check Availability
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="check-in" className="text-sm font-medium">
              Check In
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-10"
                data-testid="input-check-in"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="check-out" className="text-sm font-medium">
              Check Out
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="check-out"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="pl-10"
                data-testid="input-check-out"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests" className="text-sm font-medium">
            Guests
          </Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger id="guests" data-testid="select-guests">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full rounded-xl"
          size="lg"
          data-testid="button-search-rooms"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Available Rooms
        </Button>
      </div>
    </Card>
  );
}
