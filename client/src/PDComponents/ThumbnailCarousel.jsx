import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const ThumbnailCarouselComponent = ({ selectedStyle, imageClickHandler }) => {
  const [topIndex, setTopIndex] = useState(0)

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

  const thumbnailStyle = {
    height: '75px',
    width: '75px',
    marginBottom: '4px',
    border: 'solid, 2px, black',
    objectFit: 'cover'
  }

  const skeletonThumbnailStyle = {
    height: '75px',
    width: '75px',
    marginBottom: '4px',
    border: 'solid, 2px, black',
    objectFit: 'cover',
    backgroundColor: 'grey'
  }

  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  }

  const carouselListStyles = {
    transform: `translateY(-${topIndex * 77}px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }

  return (
    <div style={listStyles}>
      {selectedStyle
        ? (
          <>
            {(topIndex > 0) ? <FaChevronUp className='up-arrow' onClick={handleCarouselUpClick} /> : <FaChevronUp className='hidden' />}
            <div style={{ maxHeight: '395px', overflow: 'hidden' }}>
              <div style={carouselListStyles}>
                {selectedStyle.photos.map((image, index) => {
                  return <img key={index} data-index={index} style={thumbnailStyle} src={image.thumbnail_url} onClick={imageClickHandler} />
                })}
              </div>
            </div>
            {(topIndex < selectedStyle.photos.length - 5) ? <FaChevronDown className='down-arrow' onClick={handleCarouselDownClick} /> : <FaChevronDown className='hidden' />}
          </>
          )
        : [1, 2, 3, 4, 5].map((n, index) => {
            return <img key={index} style={skeletonThumbnailStyle} />
          })}
    </div>
  )
}

export default ThumbnailCarouselComponent
