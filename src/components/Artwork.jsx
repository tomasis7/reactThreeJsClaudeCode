import { useState, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Artwork = ({
  artworkData,
  position,
  rotation = [0, 0, 0],
  size = [3.2, 2.4],
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  // Load texture from the uploaded image
  const texture = useLoader(TextureLoader, artworkData.preview);

  // Calculate aspect ratio to maintain image proportions
  const img = new Image();
  img.src = artworkData.preview;
  const aspectRatio = img.naturalWidth / img.naturalHeight || 1;

  const adjustedSize =
    aspectRatio > 1
      ? [size[0], size[0] / aspectRatio] // Landscape: keep width, adjust height
      : [size[1] * aspectRatio, size[1]]; // Portrait: adjust width, keep height

  return (
    <group position={position} rotation={rotation}>
      {/* Artwork image */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.03]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={adjustedSize} />
        <meshStandardMaterial map={texture} transparent={false} />
      </mesh>

      {/* Frame */}
      <group position={[0, 0, 0.02]}>
        {/* Top border */}
        <mesh position={[0, adjustedSize[1] / 2 + 0.05, 0]}>
          <boxGeometry args={[adjustedSize[0] + 0.1, 0.1, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Bottom border */}
        <mesh position={[0, -adjustedSize[1] / 2 - 0.05, 0]}>
          <boxGeometry args={[adjustedSize[0] + 0.1, 0.1, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Left border */}
        <mesh position={[-adjustedSize[0] / 2 - 0.05, 0, 0]}>
          <boxGeometry args={[0.1, adjustedSize[1], 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Right border */}
        <mesh position={[adjustedSize[0] / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.1, adjustedSize[1], 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
      </group>

      {/* Info plaque */}
      {hovered && (
        <group position={[0, -adjustedSize[1] / 2 - 0.3, 0.02]}>
          {/* Plaque background */}
          <mesh>
            <planeGeometry args={[Math.max(2, adjustedSize[0] * 0.8), 0.4]} />
            <meshStandardMaterial color="#F5F5F5" roughness={0.2} />
          </mesh>

          {/* Border */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry
              args={[Math.max(2, adjustedSize[0] * 0.8) - 0.02, 0.38]}
            />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* Gallery lighting for this piece */}
      <spotLight
        position={[0, adjustedSize[1] / 2 + 0.5, 0.8]}
        target-position={[0, 0, 0]}
        angle={0.4}
        penumbra={0.3}
        intensity={50.4}
        distance={4}
        castShadow
      />
    </group>
  );
};

export default Artwork;
