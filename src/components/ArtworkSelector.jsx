import { useState } from 'react'

const ArtworkSelector = ({ artworks, onSelect, onClose, selectedSegment }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  
  const availableArtworks = artworks.filter(artwork => !artwork.position)
  
  const handleSelect = () => {
    if (selectedArtwork) {
      onSelect(selectedArtwork, selectedSegment)
      onClose()
    }
  }

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Select Artwork</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="upload-content">
          {availableArtworks.length === 0 ? (
            <div className="no-artworks">
              <p>No available artworks to place.</p>
              <p>Upload some images first!</p>
            </div>
          ) : (
            <>
              <p className="selector-hint">Choose an artwork to place on the wall:</p>
              
              <div className="artwork-grid">
                {availableArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className={`artwork-option ${selectedArtwork?.id === artwork.id ? 'selected' : ''}`}
                    onClick={() => setSelectedArtwork(artwork)}
                  >
                    <img src={artwork.preview} alt={artwork.title} />
                    <div className="artwork-info">
                      <h4>{artwork.title}</h4>
                      {artwork.description && (
                        <p>{artwork.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="upload-actions">
                <button className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSelect}
                  disabled={!selectedArtwork}
                >
                  Place Artwork
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtworkSelector