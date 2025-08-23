# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Digital Gallery project built with Three.js + React using React Three Fiber ecosystem. The project features FPS-style navigation in a 3D room where users can eventually upload and display their own artwork on walls.

## Development Commands

- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture & Key Concepts

### React Three Fiber Ecosystem
- **@react-three/fiber** - React renderer for Three.js, provides JSX-like syntax for 3D objects
- **@react-three/drei** - Helper components and utilities (Box, Sphere, OrbitControls, etc.)
- **Canvas** - Root component that sets up Three.js scene, camera, and renderer

### Project Structure
```
src/
├── App.jsx          # Main app with Canvas and FPS controls setup
├── components/
│   ├── Scene.jsx    # Main 3D scene container
│   ├── Room.jsx     # Gallery room with walls, floor, ceiling
│   ├── FPSControls.jsx # First-person camera controls with WASD + mouse
│   ├── WallSegment.jsx # Modular wall pieces with frames for artwork
│   ├── GalleryFurniture.jsx # Pedestals, benches, information stands
│   └── InteractiveCube.jsx # Legacy example (not currently used)
├── main.jsx         # React app entry point
└── index.css        # Global styles
```

### Core Three.js Concepts Demonstrated

**Digital Gallery Features (Phase 1 & 2 Complete):**
- `FPSControls` - First-person navigation with WASD + mouse look
- `Room` component - Gallery space with walls, floor, ceiling
- `WallSegment` - Modular wall pieces with frames and individual lighting
- `GalleryFurniture` - Pedestals, benches, and information stands
- Professional lighting system with shadows
- Pointer lock for immersive mouse control
- Collision detection to keep player within room bounds

**Geometries & Materials:**
- `planeGeometry` for room surfaces (walls, floor, ceiling)
- `meshStandardMaterial` - PBR material that responds to lighting
- Room dimensions: 20x20x4 units

**Lighting:**
- `ambientLight` - Global illumination
- `pointLight` - Directional light source

**FPS Controls Implementation:**
- Keyboard input handling for WASD movement
- Mouse movement for camera rotation with pointer lock
- Frame-rate independent movement using `useFrame` and `delta`
- Collision boundaries to prevent walking through walls
- Camera positioned at human eye level (1.7m height)

## Learning Path for Junior Developers

### 1. Three.js Fundamentals
Start with understanding the core concepts:
- **Scene** - Container for all 3D objects
- **Camera** - Viewpoint (PerspectiveCamera most common)
- **Renderer** - Draws the scene to screen
- **Mesh** - Combination of Geometry + Material

### 2. React Three Fiber Patterns
- JSX syntax maps to Three.js objects: `<mesh>` → `THREE.Mesh`
- Props become Three.js properties: `position={[1, 2, 3]}` → `mesh.position.set(1, 2, 3)`
- `useFrame` for animations
- `useRef` to access Three.js objects directly

### 3. Common Development Patterns

**FPS Controls Pattern:**
```jsx
function FPSControls() {
  const { camera, gl } = useThree()
  const moveState = useRef({ forward: false, backward: false, left: false, right: false })
  
  useFrame((state, delta) => {
    // Handle movement with collision detection
    const newPosition = camera.position.clone().add(velocity.current)
    newPosition.x = Math.max(-roomSize, Math.min(roomSize, newPosition.x))
    camera.position.copy(newPosition)
  })
}
```

**Room Creation Pattern:**
```jsx
function Room() {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}
```

### 4. Performance Considerations
- Use `Stats` component to monitor FPS
- Limit expensive operations in `useFrame`
- Consider `useMemo` for complex geometries
- Use `instancedMesh` for many similar objects

### 5. Next Learning Steps
- Materials: PBR workflow, textures, normal maps
- Post-processing effects with `@react-three/postprocessing`
- Physics with `@react-three/cannon` or `@react-three/rapier`
- GLTF model loading with `useGLTF`
- Shader programming with `shaderMaterial`

## File Naming Conventions
- Components: PascalCase (`InteractiveCube.jsx`)
- Assets: kebab-case
- Use `.jsx` extension for React components

## Common Debugging Tips
- Add `<Stats />` to monitor performance
- Use `console.log` inside `useFrame` sparingly (runs 60fps)
- Check browser console for Three.js warnings
- Use React DevTools for component state inspection