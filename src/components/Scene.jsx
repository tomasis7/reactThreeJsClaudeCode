import Room from './Room'
import WallSegment from './WallSegment'
import GalleryFurniture from './GalleryFurniture'

export default function Scene({ artworks = [], onWallSegmentClick = null, onArtworkInfoClick = null }) {
  // Define all wall segments with IDs
  const wallSegments = [
    { id: 'north-1', position: [-6, 2, -9.9], rotation: [0, 0, 0] },
    { id: 'north-2', position: [0, 2, -9.9], rotation: [0, 0, 0] },
    { id: 'north-3', position: [6, 2, -9.9], rotation: [0, 0, 0] },
    
    { id: 'south-1', position: [-6, 2, 9.9], rotation: [0, Math.PI, 0] },
    { id: 'south-2', position: [0, 2, 9.9], rotation: [0, Math.PI, 0] },
    { id: 'south-3', position: [6, 2, 9.9], rotation: [0, Math.PI, 0] },
    
    { id: 'east-1', position: [9.9, 2, -6], rotation: [0, -Math.PI / 2, 0] },
    { id: 'east-2', position: [9.9, 2, 0], rotation: [0, -Math.PI / 2, 0] },
    { id: 'east-3', position: [9.9, 2, 6], rotation: [0, -Math.PI / 2, 0] },
    
    { id: 'west-1', position: [-9.9, 2, -6], rotation: [0, Math.PI / 2, 0] },
    { id: 'west-2', position: [-9.9, 2, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'west-3', position: [-9.9, 2, 6], rotation: [0, Math.PI / 2, 0] },
  ];

  return (
    <>
      {/* Gallery Room */}
      <Room />
      
      {/* Wall segments for artwork display */}
      {wallSegments.map((segment) => {
        const artwork = artworks.find(art => art.position === segment.id);
        return (
          <WallSegment
            key={segment.id}
            segmentId={segment.id}
            position={segment.position}
            rotation={segment.rotation}
            artwork={artwork}
            onArtworkPlace={onWallSegmentClick}
            onArtworkInfo={onArtworkInfoClick}
          />
        );
      })}
      
      {/* Gallery furniture and decorations */}
      <GalleryFurniture />
    </>
  )
}