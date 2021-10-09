import React, { useState, useEffect } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { SkeletonDiv } from '../components/Shared/SSkeleton.jsx'

const SubImageCarouselComponent = ({ selectedStyle, imageClickHandler }) => {
  const [topIndex, setTopIndex] = useState(0)
  const [thumbnails, setThumbnails] = useState([])

  useEffect(() => {
    if (selectedStyle) {
      setTopIndex(0)
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return (image.thumbnail_url
          ? <img key={index} data-index={index} className='product-thumbnail' src={image.thumbnail_url} onClick={imageClickHandler} />
          : <SkeletonDiv />)
      }))
    }
  }, [selectedStyle])

  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  }

  const carouselListStyles = {
    transform: `translateY(-${topIndex * 79}px)`,
    display: 'flex',
    flexDirection: 'column',
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
    <>
      {selectedStyle
        ? (
          <div style={listStyles}>
            {(topIndex > 0) ? <FaChevronUp className='up-arrow' onClick={handleCarouselUpClick} /> : <FaChevronUp className='hidden' />}
            <div style={{ maxHeight: '414px', overflow: 'hidden' }}>
              <div style={carouselListStyles}>
                {thumbnails}
              </div>
            </div>
            {(topIndex < thumbnails.length - 5) ? <FaChevronDown className='down-arrow' onClick={handleCarouselDownClick} /> : <FaChevronDown className='hidden' />}
          </div>)
        : (
          <div style={listStyles}>
            <div style={{ maxHeight: '414px', overflow: 'hidden' }}>
              <SkeletonDiv />
            </div>
          </div>)}
    </>
  )
}
export default SubImageCarouselComponent
