import { useState } from 'react'
import { getStorageInfo, clearGalleryState } from '../utils/galleryStorage'

const AdminPanel = ({ artworks, onRemoveArtwork, onMoveArtwork, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [storageInfo, setStorageInfo] = useState(getStorageInfo())

  const placedArtworks = artworks.filter(art => art.position)
  const unplacedArtworks = artworks.filter(art => !art.position)

  const handleRemoveArtwork = (artworkId) => {
    if (window.confirm('Remove this artwork from the gallery?')) {
      onRemoveArtwork(artworkId)
      setStorageInfo(getStorageInfo())
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Clear the entire gallery? This cannot be undone!')) {
      clearGalleryState()
      window.location.reload()
    }
  }

  const exportGallery = () => {
    const galleryData = {
      artworks: artworks,
      exportDate: new Date().toISOString(),
      galleryName: 'My Digital Gallery',
      version: '1.0'
    }
    
    const blob = new Blob([JSON.stringify(galleryData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gallery-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Gallery Admin</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'artworks' ? 'active' : ''}
            onClick={() => setActiveTab('artworks')}
          >
            Manage Artworks
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Artworks</h3>
                  <div className="stat-number">{artworks.length}</div>
                </div>
                <div className="stat-card">
                  <h3>Placed</h3>
                  <div className="stat-number">{placedArtworks.length}</div>
                </div>
                <div className="stat-card">
                  <h3>Unplaced</h3>
                  <div className="stat-number">{unplacedArtworks.length}</div>
                </div>
                <div className="stat-card">
                  <h3>Storage Used</h3>
                  <div className="stat-number">{storageInfo?.sizeInMB || 0}MB</div>
                </div>
              </div>
              
              {storageInfo && (
                <div className="storage-details">
                  <h4>Storage Information</h4>
                  <p>Last saved: {new Date(storageInfo.savedAt).toLocaleString()}</p>
                  <p>Data version: {storageInfo.version}</p>
                  <div className="storage-bar">
                    <div 
                      className="storage-used" 
                      style={{ width: `${Math.min(100, (storageInfo.sizeInMB / 5) * 100)}%` }}
                    ></div>
                  </div>
                  <small>~{storageInfo.sizeInMB}MB of ~5MB LocalStorage limit</small>
                </div>
              )}
            </div>
          )}

          {activeTab === 'artworks' && (
            <div className="artworks-tab">
              <div className="artwork-section">
                <h4>Placed Artworks ({placedArtworks.length})</h4>
                <div className="artwork-list">
                  {placedArtworks.map(artwork => (
                    <div key={artwork.id} className="artwork-item">
                      <img src={artwork.preview} alt={artwork.title} className="artwork-thumb" />
                      <div className="artwork-info">
                        <h5>{artwork.title}</h5>
                        <p>Location: {artwork.position}</p>
                        {artwork.description && <p className="description">{artwork.description}</p>}
                      </div>
                      <div className="artwork-actions">
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleRemoveArtwork(artwork.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {placedArtworks.length === 0 && (
                    <p className="empty-state">No artworks placed yet</p>
                  )}
                </div>
              </div>

              <div className="artwork-section">
                <h4>Unplaced Artworks ({unplacedArtworks.length})</h4>
                <div className="artwork-list">
                  {unplacedArtworks.map(artwork => (
                    <div key={artwork.id} className="artwork-item">
                      <img src={artwork.preview} alt={artwork.title} className="artwork-thumb" />
                      <div className="artwork-info">
                        <h5>{artwork.title}</h5>
                        <p>Not placed</p>
                        {artwork.description && <p className="description">{artwork.description}</p>}
                      </div>
                      <div className="artwork-actions">
                        <button 
                          className="btn-small btn-danger"
                          onClick={() => handleRemoveArtwork(artwork.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {unplacedArtworks.length === 0 && (
                    <p className="empty-state">No unplaced artworks</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="setting-group">
                <h4>Gallery Management</h4>
                <button className="btn btn-primary" onClick={exportGallery}>
                  Export Gallery Data
                </button>
                <p className="setting-description">
                  Download all gallery data as JSON file for backup
                </p>
              </div>

              <div className="setting-group danger-zone">
                <h4>Danger Zone</h4>
                <button className="btn btn-danger" onClick={handleClearAll}>
                  Clear Entire Gallery
                </button>
                <p className="setting-description">
                  Permanently delete all artworks and settings. This cannot be undone.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel