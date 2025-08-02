import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function InteractiveCube({ position }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the cube
      meshRef.current.rotation.x += delta * (hovered ? 1 : 0.2)
      meshRef.current.rotation.y += delta * (hovered ? 0.5 : 0.1)
      
      // Scale when clicked
      const targetScale = clicked ? 1.5 : hovered ? 1.2 : 1
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={clicked ? 'red' : hovered ? 'yellow' : 'blue'} 
        wireframe={clicked}
      />
    </mesh>
  )
}