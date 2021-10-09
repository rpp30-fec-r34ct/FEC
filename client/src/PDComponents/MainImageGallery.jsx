import React, { useState, useEffect } from 'react'
import './styles/MainImageGallery.css'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import { SkeletonDiv } from '../components/Shared/SSkeleton.jsx'
import SubImageCarousel from './SubImageCarousel.jsx'
import GalleryModal from './GalleryModal.jsx'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [topIndex, setTopIndex] = useState(0)
  const [showModal, setShowModal] = useState(null)

  useEffect(() => {
    if (props.selectedStyle !== false) {
      setSelectedStyle(props.selectedStyle)
      setTopIndex(0)
    }
  }, [props])

  const imageClickHandler = (e) => {
    e.preventDefault()
    setTopIndex(parseInt(e.target.getAttribute('data-index')))
  }

  const handleCarouselLeftClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex - 1
    })
  }

  const handleCarouselRightClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex + 1
    })
  }

  const handleExpandImageClick = () => {
    setShowModal(prevState => !prevState)
  }

  const handleClickOffModal = (e) => {
    if (!e.target.closest('#gallery-modal-content')) {
      setShowModal(prevState => !prevState)
    }
  }

  return (
    <>
      {showModal && <GalleryModal selectedStyle={selectedStyle} currentIndex={topIndex} handleClickOffModal={handleClickOffModal} />}
      {selectedStyle !== null
        ? (
          <div id='gallery-container'>
            <SubImageCarousel selectedStyle={selectedStyle} imageClickHandler={imageClickHandler} />
            {(topIndex > 0) ? <FaChevronLeft className='gallery-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='gallery-arrow hidden' />}
            <div id='main-product-image' className='collapsed-product-image'>
              <FaExpand id='expand-image-button' onClick={handleExpandImageClick} />
              {selectedStyle.photos[topIndex].url
                ? <img src={selectedStyle.photos[topIndex].url} onClick={handleExpandImageClick} />
                : <SkeletonDiv />}
              <img src={selectedStyle.photos[topIndex].url} onClick={handleExpandImageClick} />
            </div>
            {(topIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='gallery-arrow hidden' />}
          </div>
          )
        : (
          <div id='gallery-container'>
            <SubImageCarousel selectedStyle={selectedStyle} imageClickHandler={imageClickHandler} />
            <div id='main-product-image' className='collapsed-product-image'>
              <SkeletonDiv />
            </div>
          </div>
          )}
    </>
  )
}

export default MainImageGalleryComponent
