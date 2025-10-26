import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Bed } from "lucide-react";
import { Link } from "wouter";

interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  beds: number;
  amenities: string[];
  slug: string;
}

export function RoomCard({
  title,
  description,
  image,
  price,
  capacity,
  beds,
  amenities,
  slug,
}: RoomCardProps) {
  return (
    <Card className="overflow-hidden group hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-xl" data-testid={`card-room-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 dark:bg-card/90 backdrop-blur-sm text-foreground border-0 shadow-lg">
            <span className="font-semibold">${price}</span>/night
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-semibold mb-2" data-testid={`text-room-title`}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{beds} {beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>

        <Link href={`/rooms/${slug}`}>
          <Button className="w-full rounded-xl" data-testid="button-view-details">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
