import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
}

export function Testimonial({ name, location, rating, comment }: TestimonialProps) {
  return (
    <Card className="p-6 h-full" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>

      <p className="text-muted-foreground mb-6 italic">
        "{comment}"
      </p>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </Card>
  );
}
