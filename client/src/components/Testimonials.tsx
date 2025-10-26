import { Testimonial } from "./Testimonial";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "An absolutely magical experience! The attention to detail and service exceeded all expectations. Can't wait to return.",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    comment: "The perfect blend of luxury and comfort. The ocean view from our suite was breathtaking, and the staff made us feel like royalty.",
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    rating: 5,
    comment: "From the moment we arrived, we were treated to exceptional hospitality. The spa treatments were divine and the dining options superb.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Guest Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our guests have to say about their stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
