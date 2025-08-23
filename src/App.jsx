import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Scene from "./components/Scene";
import FPSControls from "./components/FPSControls";

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
        shadows
      >
        {/* Enhanced Gallery Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[0, 8, 0]}
          intensity={0.9}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <spotLight
          position={[0, 3.5, -8]}
          angle={0.3}
          penumbra={0.5}
          intensity={41.5}
          castShadow
          target-position={[0, 2, -9]}
        />
        <spotLight
          position={[0, 3.5, 8]}
          angle={0.3}
          penumbra={0.5}
          intensity={41.5}
          castShadow
          target-position={[0, 2, 9]}
        />

        {/* FPS Camera Controls */}
        <FPSControls />

        {/* Performance Stats */}
        <Stats />

        {/* Our 3D Scene */}
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
