import React, { useState } from 'react'
import './styles/GalleryModal.css'
import { FaChevronLeft, FaChevronRight, FaCompress } from 'react-icons/fa'

const GalleryModal = ({ selectedStyle, currentIndex, handleCollapseImageClick, handleClickOffModal }) => {
  const [imgIndex, setImgIndex] = useState(currentIndex)

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

  return (
    <div id='gallery-modal' onClick={handleClickOffModal}>
      <div id='gallery-modal-content'>
        <FaCompress id='gallery-modal-close' onClick={handleCollapseImageClick} />
        {(imgIndex > 0) ? <FaChevronLeft className='gallery-modal-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden gallery-modal-arrow' />}
        <img id='gallery-modal-image' src={selectedStyle.photos[imgIndex].url} />
        {(imgIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-modal-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden gallery-modal-arrow' />}
      </div>
    </div>
  )
}

export default GalleryModal
