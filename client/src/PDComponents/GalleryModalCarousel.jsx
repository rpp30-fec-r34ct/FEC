import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SubImageCarouselComponent = ({ selectedStyle, imageClickHandler }) => {
  const [topIndex, setTopIndex] = useState(0)
  const [thumbnails, setThumbnails] = useState([])

  useEffect(() => {
    if (selectedStyle) {
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return <img key={index} data-index={index} className='modal-product-thumbnail' src={image.thumbnail_url} onClick={imageClickHandler} />
      }))
    }
  }, [selectedStyle])

  const listStyles = {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 'auto'
  }

  const carouselListStyles = {
    transform: `translateX(-${topIndex * 79}px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }

  const handleCarouselUpClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex - 1
    })
  }

  const handleCarouselDownClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex + 1
    })
  }

  return (
    <div style={listStyles}>
      {(topIndex > 0) ? <FaChevronLeft id='gallery-modal-carousel-left-arrow' onClick={handleCarouselUpClick} /> : <FaChevronLeft id='gallery-modal-carousel-left-arrow' className='hidden' />}
      <div style={{ maxWidth: '414px', overflow: 'hidden', display: 'flex' }}>
        <div style={carouselListStyles}>
          {thumbnails}
        </div>
      </div>
      {(topIndex < thumbnails.length - 5) ? <FaChevronRight id='gallery-modal-carousel-right-arrow' onClick={handleCarouselDownClick} /> : <FaChevronRight id='gallery-modal-carousel-right-arrow' className='hidden' />}
    </div>
  )
}

export default SubImageCarouselComponent
