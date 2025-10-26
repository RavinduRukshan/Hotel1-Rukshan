import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Luxury_hotel_hero_image_12901ecf.png";
import deluxeRoomImage from "@assets/generated_images/Deluxe_room_interior_9745000a.png";
import suiteImage from "@assets/generated_images/Executive_suite_interior_db51f9c0.png";
import familyRoomImage from "@assets/generated_images/Family_room_interior_8f0c3a6a.png";
import poolImage from "@assets/generated_images/Hotel_pool_amenity_1e8f70bb.png";
import spaImage from "@assets/generated_images/Hotel_spa_facility_51345448.png";

const images = [
  { src: heroImage, alt: "Hotel Exterior" },
  { src: deluxeRoomImage, alt: "Deluxe Room" },
  { src: suiteImage, alt: "Executive Suite" },
  { src: familyRoomImage, alt: "Family Room" },
  { src: poolImage, alt: "Infinity Pool" },
  { src: spaImage, alt: "Spa Facility" },
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our stunning property and luxurious accommodations through our curated collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer group hover-elevate active-elevate-2 transition-all duration-300"
              onClick={() => openLightbox(index)}
              data-testid={`card-gallery-${index}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white hover:text-white/70 transition-colors"
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedIndex !== null && (
              <div className="relative">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={goToPrevious}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                  onClick={goToNext}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
