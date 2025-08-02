import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import Scene from './components/Scene'

function App() {
  return (
    <>
      <div className="ui-overlay">
        <h1>Three.js + React Learning</h1>
        <p>• Mouse: Rotate camera</p>
        <p>• Scroll: Zoom in/out</p>
        <p>• Right click: Pan</p>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Camera Controls */}
        <OrbitControls enablePan enableZoom enableRotate />
        
        {/* Performance Stats */}
        <Stats />
        
        {/* Our 3D Scene */}
        <Scene />
      </Canvas>
    </>
  )
}

export default App