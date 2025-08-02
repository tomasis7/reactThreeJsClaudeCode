import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import InteractiveCube from './InteractiveCube'

function RotatingCube({ position }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
  })

  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color="orange" />
    </Box>
  )
}

function BouncingSphere({ position }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="hotpink" />
    </Sphere>
  )
}

function SpinningTorus({ position }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.8
    meshRef.current.rotation.z += delta * 0.4
  })

  return (
    <Torus ref={meshRef} position={position} args={[0.6, 0.2, 16, 32]}>
      <meshStandardMaterial color="cyan" />
    </Torus>
  )
}

export default function Scene() {
  return (
    <>
      {/* Central rotating cube */}
      <RotatingCube position={[0, 0, 0]} />
      
      {/* Bouncing sphere */}
      <BouncingSphere position={[-2.5, 0, 0]} />
      
      {/* Spinning torus */}
      <SpinningTorus position={[2.5, 0, 0]} />
      
      {/* Interactive cube */}
      <InteractiveCube position={[0, 2, 0]} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}