import React, { useState, useEffect } from 'react'
import './styles/GalleryModal.css'
import { FaChevronLeft, FaChevronRight, FaCompress } from 'react-icons/fa'

const GalleryModal = ({ selectedStyle, currentIndex, handleCollapseImageClick, handleClickOffModal }) => {
  const [imgIndex, setImgIndex] = useState(currentIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  const updateMousePosition = e => {
    const img = document.getElementById('modal-main-image')
    const imgX = img.scrollWidth
    const imgY = img.scrollHeight

    setMousePosition({ x: imgX - e.clientX, y: imgY - e.clientY })
  }

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener('mousemove', updateMousePosition)

      return () => window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [isZoomed])

  const handleCarouselLeftClick = () => {
    setImgIndex(prevIndex => {
      return prevIndex - 1
    })
  }

  const handleCarouselRightClick = () => {
    setImgIndex(prevIndex => {
      return prevIndex + 1
    })
  }

  const handleImageZoomClick = (e) => {
    e.target.classList.toggle('zoom-in-img')
    setIsZoomed(prevState => !prevState)
  }

  const zoomStyles = {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
  }

  return (
    <div id='gallery-modal' onClick={handleClickOffModal}>
      <div id='gallery-modal-content'>
        <FaCompress id='gallery-modal-close' onClick={handleCollapseImageClick} />
        {(imgIndex > 0) ? <FaChevronLeft className='gallery-modal-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden gallery-modal-arrow' />}
        <div id='modal-main-img'>
          { isZoomed
            ? <img style={zoomStyles} className='gallery-modal-image' id='modal-main-image' src={selectedStyle.photos[imgIndex].url} onClick={handleImageZoomClick} />
            : <img className='gallery-modal-image' id='modal-main-image' src={selectedStyle.photos[imgIndex].url} onClick={handleImageZoomClick} />
          }

        </div>
        {(imgIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-modal-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden gallery-modal-arrow' />}
      </div>
    </div>
  )
}

export default GalleryModal
