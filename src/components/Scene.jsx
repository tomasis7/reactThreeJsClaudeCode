import Room from './Room'
import WallSegment from './WallSegment'
import GalleryFurniture from './GalleryFurniture'

export default function Scene() {
  return (
    <>
      {/* Gallery Room */}
      <Room />
      
      {/* Wall segments for artwork display */}
      {/* North wall segments */}
      <WallSegment position={[-6, 2, -9.9]} />
      <WallSegment position={[0, 2, -9.9]} />
      <WallSegment position={[6, 2, -9.9]} />
      
      {/* South wall segments */}
      <WallSegment position={[-6, 2, 9.9]} rotation={[0, Math.PI, 0]} />
      <WallSegment position={[0, 2, 9.9]} rotation={[0, Math.PI, 0]} />
      <WallSegment position={[6, 2, 9.9]} rotation={[0, Math.PI, 0]} />
      
      {/* East wall segments */}
      <WallSegment position={[9.9, 2, -6]} rotation={[0, -Math.PI / 2, 0]} />
      <WallSegment position={[9.9, 2, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <WallSegment position={[9.9, 2, 6]} rotation={[0, -Math.PI / 2, 0]} />
      
      {/* West wall segments */}
      <WallSegment position={[-9.9, 2, -6]} rotation={[0, Math.PI / 2, 0]} />
      <WallSegment position={[-9.9, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <WallSegment position={[-9.9, 2, 6]} rotation={[0, Math.PI / 2, 0]} />
      
      {/* Gallery furniture and decorations */}
      <GalleryFurniture />
    </>
  )
}