import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Scene from "./components/Scene";
import FPSControls from "./components/FPSControls";
import ImageUpload from "./components/ImageUpload";
import ArtworkSelector from "./components/ArtworkSelector";
import ArtworkInfo from "./components/ArtworkInfo";
import AdminPanel from "./components/AdminPanel";
import { saveGalleryState, loadGalleryState, debouncedSave, getStorageInfo } from "./utils/galleryStorage";

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showArtworkInfo, setShowArtworkInfo] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [storageInfo, setStorageInfo] = useState(null);

  // Load gallery state on app startup
  useEffect(() => {
    const savedArtworks = loadGalleryState();
    if (savedArtworks.length > 0) {
      setArtworks(savedArtworks);
      console.log(`Restored ${savedArtworks.length} artworks from LocalStorage`);
    }
    updateStorageInfo();
  }, []);

  // Auto-save whenever artworks change
  useEffect(() => {
    if (artworks.length > 0) {
      debouncedSave(artworks);
      updateStorageInfo();
    }
  }, [artworks]);

  const updateStorageInfo = () => {
    setStorageInfo(getStorageInfo());
  };

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

  const handleClearGallery = () => {
    if (window.confirm('Are you sure you want to clear the entire gallery? This cannot be undone.')) {
      setArtworks([]);
      // Clear from localStorage
      import('./utils/galleryStorage').then(({ clearGalleryState }) => {
        clearGalleryState();
        updateStorageInfo();
      });
    }
  };

  const handleArtworkInfoClick = (artwork) => {
    setSelectedArtwork(artwork);
    setShowArtworkInfo(true);
  };

  const handleRemoveArtwork = (artworkId) => {
    setArtworks(prev => prev.filter(art => art.id !== artworkId));
  };

  const handleMoveArtwork = (artworkId, newPosition) => {
    setArtworks(prev => prev.map(art => 
      art.id === artworkId ? { ...art, position: newPosition } : art
    ));
  };

  return (
    <>
      <div className="ui-overlay">
        <h1>Digital Gallery</h1>
        <p>• WASD: Move around</p>
        <p>• Mouse: Look around (click to enable)</p>
        <p>• ESC: Exit pointer lock</p>
        <p>• Drag yellow sphere: Adjust spotlight</p>
        <p>• Hold Shift + drag: Move light forward/back</p>
        {storageInfo && (
          <div className="storage-info">
            <small>Gallery: {storageInfo.artworkCount} items ({storageInfo.sizeInKB}KB)</small>
          </div>
        )}
      </div>

      <div className="controls-panel">
        <button 
          className="upload-btn"
          onClick={() => setShowUpload(true)}
        >
          Upload Artwork
        </button>
        
        {artworks.length > 0 && (
          <button 
            className="clear-btn"
            onClick={handleClearGallery}
          >
            Clear Gallery
          </button>
        )}
        
        <button 
          className="admin-btn"
          onClick={() => setShowAdmin(true)}
        >
          Admin Panel
        </button>
      </div>

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

      {showArtworkInfo && (
        <ArtworkInfo
          artwork={selectedArtwork}
          onClose={() => setShowArtworkInfo(false)}
        />
      )}

      {showAdmin && (
        <AdminPanel
          artworks={artworks}
          onRemoveArtwork={handleRemoveArtwork}
          onMoveArtwork={handleMoveArtwork}
          onClose={() => setShowAdmin(false)}
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
        <Scene 
          artworks={artworks} 
          onWallSegmentClick={handleWallSegmentClick}
          onArtworkInfoClick={handleArtworkInfoClick}
        />
      </Canvas>
    </>
  );
}

export default App;
