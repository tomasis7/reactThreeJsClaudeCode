const Room = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      
      {/* North Wall */}
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#DDDDD0" />
      </mesh>
      
      {/* South Wall */}
      <mesh position={[0, 2, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#DDDDD0" />
      </mesh>
      
      {/* East Wall */}
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#DDDDD0" />
      </mesh>
      
      {/* West Wall */}
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#DDDDD0" />
      </mesh>
    </group>
  )
}

export default Room