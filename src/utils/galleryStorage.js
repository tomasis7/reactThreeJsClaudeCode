// Gallery LocalStorage utilities
const GALLERY_STORAGE_KEY = 'digitalGallery'

export const saveGalleryState = (artworks) => {
  try {
    const galleryData = {
      artworks: artworks.map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        preview: artwork.preview, // base64 image data
        position: artwork.position, // wall segment ID
        lightPosition: artwork.lightPosition || [0, 1.2, 0.3], // custom lighting
        file: {
          name: artwork.file?.name,
          type: artwork.file?.type,
          size: artwork.file?.size,
          lastModified: artwork.file?.lastModified
        }
      })),
      savedAt: new Date().toISOString(),
      version: '1.0'
    }
    
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(galleryData))
    console.log(`Gallery saved: ${artworks.length} artworks`)
    return true
  } catch (error) {
    console.error('Failed to save gallery:', error)
    // Handle quota exceeded or other errors
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Consider reducing image sizes.')
    }
    return false
  }
}

export const loadGalleryState = () => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY)
    if (!stored) {
      console.log('No saved gallery found')
      return []
    }
    
    const galleryData = JSON.parse(stored)
    
    // Validate data structure
    if (!galleryData.artworks || !Array.isArray(galleryData.artworks)) {
      console.warn('Invalid gallery data structure')
      return []
    }
    
    console.log(`Gallery loaded: ${galleryData.artworks.length} artworks (saved ${galleryData.savedAt})`)
    return galleryData.artworks
  } catch (error) {
    console.error('Failed to load gallery:', error)
    return []
  }
}

export const clearGalleryState = () => {
  try {
    localStorage.removeItem(GALLERY_STORAGE_KEY)
    console.log('Gallery cleared')
    return true
  } catch (error) {
    console.error('Failed to clear gallery:', error)
    return false
  }
}

export const getStorageInfo = () => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY)
    if (!stored) return null
    
    const sizeInBytes = new Blob([stored]).size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2)
    
    const data = JSON.parse(stored)
    
    return {
      artworkCount: data.artworks?.length || 0,
      sizeInBytes,
      sizeInKB,
      sizeInMB,
      savedAt: data.savedAt,
      version: data.version
    }
  } catch (error) {
    console.error('Failed to get storage info:', error)
    return null
  }
}

// Auto-save debouncing utility
let saveTimeout = null
export const debouncedSave = (artworks, delay = 1000) => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveGalleryState(artworks)
  }, delay)
}