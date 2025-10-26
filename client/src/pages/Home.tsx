import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedRooms } from "@/components/FeaturedRooms";
import { Amenities } from "@/components/Amenities";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="rooms">
          <FeaturedRooms />
        </div>
        <div id="amenities">
          <Amenities />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <Testimonials />
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
