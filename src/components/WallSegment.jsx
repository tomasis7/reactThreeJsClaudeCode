import { useState } from 'react'

const WallSegment = ({ position, rotation = [0, 0, 0], width = 4, height = 3 }) => {
  const [hovered, setHovered] = useState(false)
  
  return (
    <group position={position} rotation={rotation}>
      {/* Wall section background */}
      <mesh 
        position={[0, 0, 0.01]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial 
          color={hovered ? "#F0F0F0" : "#E8E8E8"} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Picture frame placeholder */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width * 0.8, height * 0.7]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.5} />
      </mesh>
      
      {/* Frame border */}
      <group position={[0, 0, 0.03]}>
        {/* Top border */}
        <mesh position={[0, (height * 0.7) / 2 + 0.05, 0]}>
          <boxGeometry args={[width * 0.8 + 0.1, 0.1, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Bottom border */}
        <mesh position={[0, -(height * 0.7) / 2 - 0.05, 0]}>
          <boxGeometry args={[width * 0.8 + 0.1, 0.1, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Left border */}
        <mesh position={[-(width * 0.8) / 2 - 0.05, 0, 0]}>
          <boxGeometry args={[0.1, height * 0.7, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
        {/* Right border */}
        <mesh position={[(width * 0.8) / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.1, height * 0.7, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.3} />
        </mesh>
      </group>
      
      {/* Small gallery light above */}
      <spotLight
        position={[0, height / 2 + 0.3, 0.5]}
        target-position={[0, 0, 0]}
        angle={0.4}
        penumbra={0.3}
        intensity={0.3}
        distance={3}
        castShadow
      />
    </group>
  )
}

export default WallSegment