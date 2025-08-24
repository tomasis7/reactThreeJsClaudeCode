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
│   ├── ImageUpload.jsx # File upload modal with drag & drop
│   ├── Artwork.jsx  # Dynamic artwork display with adjustable lighting
│   ├── ArtworkSelector.jsx # Modal for selecting artwork to place
│   ├── ArtworkInfo.jsx # Detailed artwork information display
│   ├── AdminPanel.jsx # Complete gallery management interface
│   └── InteractiveCube.jsx # Legacy example (not currently used)
├── utils/
│   └── galleryStorage.js # LocalStorage persistence utilities
├── main.jsx         # React app entry point
└── index.css        # Global styles
```

### Core Three.js Concepts Demonstrated

**Digital Gallery Features (ALL PHASES COMPLETE):**
- `FPSControls` - First-person navigation with WASD + mouse look
- `Room` component - Gallery space with walls, floor, ceiling
- `WallSegment` - Modular wall pieces with frames and individual lighting
- `GalleryFurniture` - Pedestals, benches, and information stands
- `ImageUpload` - Drag & drop file upload with metadata input
- `Artwork` - Dynamic texture loading and aspect ratio preservation
- `ArtworkSelector` - Modal interface for placing artworks on walls
- `ArtworkInfo` - Detailed artwork information display system
- `AdminPanel` - Complete gallery management interface
- Interactive spotlight positioning with 3D drag controls
- LocalStorage persistence (artworks survive page reloads)
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

**Dynamic Artwork Loading:**
```jsx
function Artwork({ artworkData }) {
  const texture = useLoader(TextureLoader, artworkData.preview)
  const [lightPosition, setLightPosition] = useState([0, 1.2, 0.3])
  
  return (
    <group>
      <mesh>
        <planeGeometry args={adjustedSize} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <spotLight position={lightPosition} target={targetRef.current} />
    </group>
  )
}
```

**Interactive Upload System:**
```jsx
function ImageUpload({ onImageUpload }) {
  const handleFileSelect = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }
  
  return (
    <div onDrop={handleDrop} onClick={() => fileInputRef.current.click()}>
      {/* Upload interface */}
    </div>
  )
}
```

**Gallery Management System:**
```jsx
function AdminPanel({ artworks, onRemoveArtwork }) {
  const exportGallery = () => {
    const blob = new Blob([JSON.stringify(galleryData, null, 2)])
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'gallery-export.json'
    link.click()
  }
  
  return (
    <div className="admin-panel">
      {/* Admin interface with stats, artwork management, settings */}
    </div>
  )
}
```

**LocalStorage Persistence:**
```jsx
export const saveGalleryState = (artworks) => {
  try {
    const galleryData = { artworks, savedAt: new Date().toISOString() }
    localStorage.setItem('digitalGallery', JSON.stringify(galleryData))
    return true
  } catch (error) {
    console.error('Failed to save gallery:', error)
    return false
  }
}
```

### 4. Performance Considerations
- Use `Stats` component to monitor FPS
- Limit expensive operations in `useFrame`
- Consider `useMemo` for complex geometries
- Use `instancedMesh` for many similar objects

### 5. Digital Gallery Complete Features
This project demonstrates a fully-featured digital gallery application with:
- **Professional 3D Environment** - Realistic gallery space with proper lighting
- **User Content Management** - Upload, place, and manage personal artwork
- **Persistent Storage** - LocalStorage integration for data persistence
- **Admin Interface** - Complete management system with statistics and export
- **Interactive Elements** - Spotlight adjustment, artwork information, click interactions
- **Performance Optimization** - Efficient rendering with collision detection

### 6. Next Learning Steps
- Materials: PBR workflow, textures, normal maps
- Post-processing effects with `@react-three/postprocessing`
- Physics with `@react-three/cannon` or `@react-three/rapier`
- GLTF model loading with `useGLTF` for 3D sculptures
- Shader programming with `shaderMaterial` for advanced effects
- Multi-user galleries with WebSocket integration
- VR support with WebXR

## File Naming Conventions
- Components: PascalCase (`InteractiveCube.jsx`)
- Assets: kebab-case
- Use `.jsx` extension for React components

## Common Debugging Tips
- Add `<Stats />` to monitor performance
- Use `console.log` inside `useFrame` sparingly (runs 60fps)
- Check browser console for Three.js warnings
- Use React DevTools for component state inspection