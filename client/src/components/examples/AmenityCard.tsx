import { AmenityCard } from '../AmenityCard'
import { Waves } from 'lucide-react'

export default function AmenityCardExample() {
  return (
    <div className="max-w-xs">
      <AmenityCard
        icon={Waves}
        title="Infinity Pool"
        description="Relax in our stunning infinity pool with panoramic ocean views"
      />
    </div>
  )
}
