import { RoomCard } from '../RoomCard'
import deluxeRoomImage from '@assets/generated_images/Deluxe_room_interior_9745000a.png'

export default function RoomCardExample() {
  return (
    <div className="max-w-sm">
      <RoomCard
        title="Deluxe Ocean View"
        description="Spacious room with stunning ocean views, king-size bed, and modern amenities for the perfect getaway."
        image={deluxeRoomImage}
        price={299}
        capacity={2}
        beds={1}
        amenities={['Ocean View', 'WiFi', 'Mini Bar', 'Smart TV', 'Balcony']}
        slug="deluxe-ocean-view"
      />
    </div>
  )
}
