import React, { useState, useEffect } from 'react'
import './styles/MainImageGallery.css'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import MainImgageCarousel from './MainImageCarousel.jsx'
import SubImageCarousel from './SubImageCarousel.jsx'
import GalleryModal from './GalleryModal.jsx'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [thumbnails, setThumbnails] = useState([])
  const [topIndex, setTopIndex] = useState(0)
  const [showModal, setShowModal] = useState(null)

  useEffect(() => {
    if (selectedStyle) {
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return <img key={index} data-index={index} className='product-thumbnail' src={image.thumbnail_url} onClick={imageClickHandler} />
      }))
    }
  }, [selectedStyle])

  useEffect(() => {
    if (props.selectedStyle !== false) {
      setSelectedStyle(props.selectedStyle)
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
    // document.getElementById('main-product-image').classList.toggle('expanded-product-image')
  }

  const handleClickOffModal = (e) => {
    if (!e.target.closest('#gallery-modal-content')) {
      setShowModal(prevState => !prevState)
    }
  }

  return (
    <div>
      {showModal && <GalleryModal selectedStyle={selectedStyle} currentIndex={topIndex} handleCollapseImageClick={handleExpandImageClick} handleClickOffModal={handleClickOffModal} />}
      {selectedStyle !== null
        ? (
          <div id='gallery-container'>
            <SubImageCarousel thumbnails={thumbnails} />
            {(topIndex > 0) ? <FaChevronLeft className='gallery-arrow' onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden' />}
            <div id='main-product-image' className='collapsed-product-image'>
              <FaExpand id='expand-image-button' onClick={handleExpandImageClick} />
              <img src={selectedStyle.photos[topIndex].url} />
            </div>
            {(topIndex < selectedStyle.photos.length - 1) ? <FaChevronRight className='gallery-arrow' onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden' />}
          </div>
          )
        : null}

    </div>
  )
}

export default MainImageGalleryComponent
