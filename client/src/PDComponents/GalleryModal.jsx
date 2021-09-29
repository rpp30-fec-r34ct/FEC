import React, { useState } from 'react'
import './styles/ImageZoomStyles.css'
import './styles/GalleryModal.css'
import { FaChevronLeft, FaChevronRight, FaCompress } from 'react-icons/fa'
import InnerImageZoom from 'react-inner-image-zoom'
import SubImageCarousel from './GalleryModalCarousel.jsx'

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
        <div id='modal-main-img-container'>
          <div id='modal-main-img'>
          {(imgIndex > 0) ? <FaChevronLeft className='gallery-modal-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden gallery-modal-arrow' />}
            <InnerImageZoom src={selectedStyle.photos[imgIndex].url} zoomScale={2} />
          {(imgIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-modal-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden gallery-modal-arrow' />}
          </div>
        </div>
        <div id='modal-sub-carousel'>
          <SubImageCarousel selectedStyle={selectedStyle} imageClickHandler={imageClickHandler} />
        </div>
      </div>
    </div>
  )
}

export default GalleryModal
