# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Three.js + React learning project using React Three Fiber ecosystem. The project demonstrates 3D graphics fundamentals, animations, and interactivity in a web browser.

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
├── App.jsx          # Main app with Canvas setup
├── components/
│   ├── Scene.jsx    # Main 3D scene container
│   └── InteractiveCube.jsx # Example interactive 3D object
├── main.jsx         # React app entry point
└── index.css        # Global styles
```

### Core Three.js Concepts Demonstrated

**Geometries & Materials:**
- `boxGeometry`, `sphereGeometry`, `torusGeometry`, `planeGeometry`
- `meshStandardMaterial` - PBR material that responds to lighting
- Material properties: color, wireframe

**Lighting:**
- `ambientLight` - Global illumination
- `pointLight` - Directional light source

**Animation with useFrame:**
- Hook that runs every frame (60fps)
- Access to `state.clock.elapsedTime` for time-based animations
- `delta` parameter for frame-rate independent movement

**Camera Controls:**
- `OrbitControls` - Mouse/touch camera interaction
- Camera positioned at `[x, y, z]` coordinates

**Interactivity:**
- `onClick`, `onPointerOver`, `onPointerOut` event handlers
- State management with React hooks for dynamic behavior

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

**Creating Animated Objects:**
```jsx
function AnimatedCube() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
```

**Interactive Objects:**
```jsx
const [hovered, setHovered] = useState(false)

<mesh 
  onClick={() => console.log('clicked')}
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
>
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