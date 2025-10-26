import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AmenityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function AmenityCard({ icon: Icon, title, description }: AmenityCardProps) {
  return (
    <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-amenity-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
