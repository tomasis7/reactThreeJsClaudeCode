import { useState, useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, Object3D, Vector3, Raycaster } from "three";

const Artwork = ({
  artworkData,
  position,
  rotation = [0, 0, 0],
  size = [3.2, 2.4],
}) => {
  const [hovered, setHovered] = useState(false);
  const [lightPosition, setLightPosition] = useState([
    0,
    size[1] / 2 + 0.7,
    0.3,
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const meshRef = useRef();
  const spotLightRef = useRef();
  const targetRef = useRef();
  const { camera, gl } = useThree();

  // Load texture from the uploaded image
  const texture = useLoader(TextureLoader, artworkData.preview);

  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
  }, []);

  const handleLightDragStart = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    gl.domElement.style.cursor = "grabbing";
  };

  const handleLightDrag = (event) => {
    if (!isDragging) return;
    event.stopPropagation();

    // Convert mouse movement to 3D world coordinates
    const deltaX = event.movementX * 0.01;
    const deltaY = -event.movementY * 0.01;

    // Hold Shift to move forward/backward (Z axis) instead of up/down (Y axis)
    const isShiftPressed = event.shiftKey;

    setLightPosition((prev) => [
      Math.max(-3, Math.min(3, prev[0] + deltaX)), // X: left/right (increased range)
      isShiftPressed
        ? prev[1] // Keep Y unchanged when moving Z
        : Math.max(0.5, Math.min(4, prev[1] + deltaY)), // Y: up/down (increased range)
      isShiftPressed
        ? Math.max(-2, Math.min(4, prev[2] + deltaY * 2)) // Z: forward/backward (2x sensitivity, larger range)
        : prev[2], // Keep Z unchanged when moving Y
    ]);
  };

  const handleLightDragEnd = (event) => {
    event.stopPropagation();
    setIsDragging(false);
    gl.domElement.style.cursor = "auto";
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (event) =>
        handleLightDrag({
          movementX: event.movementX,
          movementY: event.movementY,
          shiftKey: event.shiftKey,
          stopPropagation: () => {},
        });
      const handleMouseUp = (event) =>
        handleLightDragEnd({
          stopPropagation: () => {},
        });

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

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

      {/* Spotlight target (invisible) - positioned at artwork center */}
      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Gallery lighting for this piece */}
      <spotLight
        ref={spotLightRef}
        position={lightPosition}
        angle={0.8}
        penumbra={0.5}
        intensity={20}
        distance={8}
        castShadow
        color="#FFFFFF"
      />

      {/* Draggable debug light indicator - small glowing sphere */}
      <mesh
        position={lightPosition}
        onPointerDown={handleLightDragStart}
        onPointerOver={() => (gl.domElement.style.cursor = "grab")}
        onPointerOut={() =>
          !isDragging && (gl.domElement.style.cursor = "auto")
        }
      >
        <sphereGeometry args={[0.12]} />
        <meshBasicMaterial
          color={isDragging ? "#FF8800" : "#FFFF00"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Debug target indicator - small red sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
    </group>
  );
};

export default Artwork;
