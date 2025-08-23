const GalleryFurniture = () => {
  return (
    <group>
      {/* Central display pedestal */}
      <group position={[0, 0, 0]}>
        {/* Pedestal base */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1, 0.6, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Pedestal top */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 16]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.2} />
        </mesh>
      </group>
      
      {/* Gallery benches */}
      <group position={[-3, 0, -3]}>
        {/* Bench seat */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 0.5]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        {/* Bench legs */}
        <mesh position={[-0.8, 0.2, -0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.8, 0.2, -0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[-0.8, 0.2, 0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.8, 0.2, 0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
      </group>
      
      {/* Another bench */}
      <group position={[3, 0, 3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 0.5]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[-0.8, 0.2, -0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.8, 0.2, -0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[-0.8, 0.2, 0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.8, 0.2, 0.15]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
      </group>
      
      {/* Information stand near entrance */}
      <group position={[7, 0, 7]}>
        {/* Stand pole */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Information board */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

export default GalleryFurniture