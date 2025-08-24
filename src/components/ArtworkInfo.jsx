import { useState, useEffect } from 'react'

const ArtworkInfo = ({ artwork, position, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  if (!artwork) return null

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200) // Wait for fade out
  }

  return (
    <div 
      className={`artwork-info-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleClose}
    >
      <div 
        className="artwork-info-panel"
        onClick={e => e.stopPropagation()}
      >
        <div className="artwork-info-header">
          <h3>{artwork.title}</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="artwork-info-content">
          {/* Artwork preview */}
          <div className="artwork-preview">
            <img src={artwork.preview} alt={artwork.title} />
          </div>
          
          {/* Artwork details */}
          <div className="artwork-details">
            {artwork.description && (
              <div className="detail-section">
                <label>Description</label>
                <p>{artwork.description}</p>
              </div>
            )}
            
            <div className="detail-section">
              <label>Location</label>
              <p>Wall segment: {artwork.position}</p>
            </div>
            
            {artwork.file && (
              <div className="detail-section">
                <label>File Info</label>
                <div className="file-info">
                  <p><strong>Name:</strong> {artwork.file.name}</p>
                  <p><strong>Type:</strong> {artwork.file.type}</p>
                  <p><strong>Size:</strong> {(artwork.file.size / 1024).toFixed(1)}KB</p>
                  {artwork.file.lastModified && (
                    <p><strong>Modified:</strong> {new Date(artwork.file.lastModified).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="detail-section">
              <label>Gallery ID</label>
              <p className="gallery-id">#{artwork.id}</p>
            </div>
          </div>
        </div>
        
        <div className="artwork-info-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArtworkInfo