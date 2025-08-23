import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import Scene from './components/Scene'
import FPSControls from './components/FPSControls'

function App() {
  return (
    <>
      <div className="ui-overlay">
        <h1>Digital Gallery</h1>
        <p>• WASD: Move around</p>
        <p>• Mouse: Look around (click to enable)</p>
        <p>• ESC: Exit pointer lock</p>
      </div>
      
      <Canvas
        camera={{ position: [0, 1.7, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* FPS Camera Controls */}
        <FPSControls />
        
        {/* Performance Stats */}
        <Stats />
        
        {/* Our 3D Scene */}
        <Scene />
      </Canvas>
    </>
  )
}

export default App