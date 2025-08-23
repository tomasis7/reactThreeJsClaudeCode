import { useState, useRef } from 'react'

const ImageUpload = ({ onImageUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleSubmit = () => {
    if (selectedFile && title.trim()) {
      onImageUpload({
        file: selectedFile,
        title: title.trim(),
        description: description.trim(),
        preview
      })
      // Reset form
      setSelectedFile(null)
      setPreview(null)
      setTitle('')
      setDescription('')
      onClose()
    }
  }

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Upload Artwork</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="upload-content">
          {/* File Upload Area */}
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <p>Click to change image</p>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📸</div>
                <p>Drag & drop an image here, or click to select</p>
                <p className="upload-hint">Supports: JPG, PNG, GIF, WebP</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </div>

          {/* Artwork Details */}
          <div className="artwork-details">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter artwork title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter artwork description (optional)"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="upload-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!selectedFile || !title.trim()}
            >
              Add to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload