import { useState } from 'react'
import Artwork from './Artwork'

const WallSegment = ({ 
  position, 
  rotation = [0, 0, 0], 
  width = 4, 
  height = 3, 
  artwork = null,
  onArtworkPlace = null,
  segmentId = null
}) => {
  const [hovered, setHovered] = useState(false)
  
  const handleClick = () => {
    if (!artwork && onArtworkPlace && segmentId) {
      onArtworkPlace(segmentId)
    }
  }
  
  return (
    <group position={position} rotation={rotation}>
      {/* Wall section background */}
      <mesh 
        position={[0, 0, 0.01]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial 
          color={hovered && !artwork ? "#F0F0F0" : "#E8E8E8"} 
          roughness={0.7}
        />
      </mesh>
      
      {artwork ? (
        // Display actual artwork
        <Artwork 
          artworkData={artwork} 
          position={[0, 0, 0]} 
          rotation={[0, 0, 0]}
        />
      ) : (
        // Empty frame placeholder
        <>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[width * 0.8, height * 0.7]} />
            <meshStandardMaterial 
              color={hovered ? "#E0E0E0" : "#D3D3D3"} 
              roughness={0.5} 
            />
          </mesh>
          
          {/* Frame border */}
          <group position={[0, 0, 0.03]}>
            <mesh position={[0, (height * 0.7) / 2 + 0.05, 0]}>
              <boxGeometry args={[width * 0.8 + 0.1, 0.1, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} />
            </mesh>
            <mesh position={[0, -(height * 0.7) / 2 - 0.05, 0]}>
              <boxGeometry args={[width * 0.8 + 0.1, 0.1, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} />
            </mesh>
            <mesh position={[-(width * 0.8) / 2 - 0.05, 0, 0]}>
              <boxGeometry args={[0.1, height * 0.7, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} />
            </mesh>
            <mesh position={[(width * 0.8) / 2 + 0.05, 0, 0]}>
              <boxGeometry args={[0.1, height * 0.7, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} />
            </mesh>
          </group>
          
          {/* Plus icon for empty slots */}
          {hovered && (
            <group position={[0, 0, 0.04]}>
              <mesh>
                <planeGeometry args={[0.5, 0.1]} />
                <meshStandardMaterial color="#999999" />
              </mesh>
              <mesh>
                <planeGeometry args={[0.1, 0.5]} />
                <meshStandardMaterial color="#999999" />
              </mesh>
            </group>
          )}
        </>
      )}
      
      {/* Gallery lighting */}
      {!artwork && (
        <spotLight
          position={[0, height / 2 + 0.3, 0.5]}
          target-position={[0, 0, 0]}
          angle={0.4}
          penumbra={0.3}
          intensity={0.3}
          distance={3}
          castShadow
        />
      )}
    </group>
  )
}

export default WallSegment