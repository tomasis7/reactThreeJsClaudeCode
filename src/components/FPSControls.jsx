import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

const FPSControls = () => {
  const { camera, gl } = useThree()
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  })
  const velocity = useRef(new Vector3())
  const direction = useRef(new Vector3())
  
  const moveSpeed = 5
  const lookSensitivity = 0.002
  
  const euler = useRef({ x: 0, y: 0 })
  const isPointerLocked = useRef(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = true
          break
      }
    }

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveState.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          moveState.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          moveState.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          moveState.current.right = false
          break
      }
    }

    const handleMouseMove = (event) => {
      if (!isPointerLocked.current) return

      const { movementX, movementY } = event
      
      euler.current.y -= movementX * lookSensitivity
      euler.current.x -= movementY * lookSensitivity
      
      // Limit vertical look
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
    }

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === gl.domElement
    }

    const handleClick = () => {
      if (!isPointerLocked.current) {
        gl.domElement.requestPointerLock()
      }
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    gl.domElement.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [gl])

  useFrame((state, delta) => {
    // Update camera rotation
    camera.rotation.set(euler.current.x, euler.current.y, 0, 'YXZ')
    
    // Reset velocity
    velocity.current.set(0, 0, 0)
    
    // Calculate movement direction based on camera orientation
    direction.current.set(0, 0, 0)
    
    if (moveState.current.forward) {
      direction.current.z -= 1
    }
    if (moveState.current.backward) {
      direction.current.z += 1
    }
    if (moveState.current.left) {
      direction.current.x -= 1
    }
    if (moveState.current.right) {
      direction.current.x += 1
    }
    
    // Normalize diagonal movement
    if (direction.current.length() > 0) {
      direction.current.normalize()
    }
    
    // Apply camera rotation to movement direction
    direction.current.applyEuler(camera.rotation)
    
    // Set velocity
    velocity.current.copy(direction.current).multiplyScalar(moveSpeed * delta)
    
    // Store current position for collision check
    const newPosition = camera.position.clone().add(velocity.current)
    
    // Simple collision detection - keep player inside room bounds
    const roomSize = 9.5 // slightly smaller than room walls (10)
    newPosition.x = Math.max(-roomSize, Math.min(roomSize, newPosition.x))
    newPosition.z = Math.max(-roomSize, Math.min(roomSize, newPosition.z))
    newPosition.y = Math.max(0.5, Math.min(3.5, newPosition.y)) // floor to ceiling
    
    // Apply constrained movement to camera
    camera.position.copy(newPosition)
  })

  return null
}

export default FPSControls