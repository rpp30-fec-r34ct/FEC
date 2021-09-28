import React, { useState, useEffect } from 'react'
import './styles/ImageZoomStyles.css'
import './styles/GalleryModal.css'
import { FaChevronLeft, FaChevronRight, FaCompress } from 'react-icons/fa'
import InnerImageZoom from 'react-inner-image-zoom'
import SubImageCarousel from './SubImageCarousel.jsx'

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

  const imageClickHandler = (e) => {
    e.preventDefault()
    setImgIndex(parseInt(e.target.getAttribute('data-index')))
  }

  return (
    <div id='gallery-modal' onClick={handleClickOffModal}>
      <div id='gallery-modal-content'>
        <div>
          <FaCompress id='gallery-modal-close' onClick={handleCollapseImageClick} />
          {(imgIndex > 0) ? <FaChevronLeft className='gallery-modal-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden gallery-modal-arrow' />}
          <div style={{ height: '100%', width: '40%', overflow: 'hidden'}}>
            <InnerImageZoom src={selectedStyle.photos[imgIndex].url} zoomScale={2} />
          </div>
          {(imgIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-modal-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden gallery-modal-arrow' />}
        </div>
        <SubImageCarousel selectedStyle={selectedStyle} imageClickHandler={imageClickHandler} />
      </div>
    </div>
  )
}

export default GalleryModal
