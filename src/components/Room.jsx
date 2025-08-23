const Room = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2C1810" roughness={0.8} />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.9} />
      </mesh>
      
      {/* North Wall */}
      <mesh position={[0, 2, -10]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.7} />
      </mesh>
      
      {/* South Wall */}
      <mesh position={[0, 2, 10]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.7} />
      </mesh>
      
      {/* East Wall */}
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.7} />
      </mesh>
      
      {/* West Wall */}
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default Room