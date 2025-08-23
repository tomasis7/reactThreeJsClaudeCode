import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Scene from "./components/Scene";
import FPSControls from "./components/FPSControls";
import ImageUpload from "./components/ImageUpload";
import ArtworkSelector from "./components/ArtworkSelector";

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [artworks, setArtworks] = useState([]);

  const handleImageUpload = (artworkData) => {
    const newArtwork = {
      id: Date.now(),
      ...artworkData,
      position: null // Will be set when placed on wall
    };
    setArtworks(prev => [...prev, newArtwork]);
  };

  const handleWallSegmentClick = (segmentId) => {
    setSelectedSegment(segmentId);
    setShowSelector(true);
  };

  const handleArtworkPlace = (artwork, segmentId) => {
    setArtworks(prev => prev.map(art => 
      art.id === artwork.id 
        ? { ...art, position: segmentId }
        : art
    ));
  };

  return (
    <>
      <div className="ui-overlay">
        <h1>Digital Gallery</h1>
        <p>• WASD: Move around</p>
        <p>• Mouse: Look around (click to enable)</p>
        <p>• ESC: Exit pointer lock</p>
      </div>

      <button 
        className="upload-btn"
        onClick={() => setShowUpload(true)}
      >
        Upload Artwork
      </button>

      {showUpload && (
        <ImageUpload
          onImageUpload={handleImageUpload}
          onClose={() => setShowUpload(false)}
        />
      )}

      {showSelector && (
        <ArtworkSelector
          artworks={artworks}
          selectedSegment={selectedSegment}
          onSelect={handleArtworkPlace}
          onClose={() => setShowSelector(false)}
        />
      )}

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
        <Scene artworks={artworks} onWallSegmentClick={handleWallSegmentClick} />
      </Canvas>
    </>
  );
}

export default App;
