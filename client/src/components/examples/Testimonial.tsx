import { Testimonial } from '../Testimonial'

export default function TestimonialExample() {
  return (
    <div className="max-w-md">
      <Testimonial
        name="Sarah Johnson"
        location="New York, USA"
        rating={5}
        comment="An absolutely magical experience! The attention to detail and service exceeded all expectations. Can't wait to return."
      />
    </div>
  )
}
