import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MainImgageCarousel from './MainImageCarousel.jsx'
import SubImageCarousel from './SubImageCarousel.jsx'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [thumbnails, setThumbnails] = useState([])
  const [topIndex, setTopIndex] = useState(0)

  useEffect(() => {
    if (selectedStyle) {
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return <img key={index} data-index={index} style={thumbnailStyle} src={image.thumbnail_url} onClick={imageClickHandler} />
      }))
    }
  }, [selectedStyle])

  useEffect(() => {
    if (props.selectedStyle !== false) {
      setSelectedStyle(props.selectedStyle)
      setSelectedImage(props.selectedStyle.photos[0].url)
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

  const thumbnailStyle = {
    height: '75px',
    width: '75px',
    marginBottom: '4px',
    border: 'solid, 2px, black',
    objectFit: 'cover'
  }

  const containerStyle = {
    height: '500px',
    width: '500px',
    display: 'flex',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }

  return (
    <div>
      {selectedStyle !== null
      ? <div style={containerStyle}>
          <SubImageCarousel thumbnails={thumbnails} />
            {(topIndex > 0) ? <FaChevronLeft onClick={handleCarouselLeftClick} /> : <FaChevronLeft className='hidden' />}
          <div style={{ width: '400px', height: '500px', overflow: 'hidden' }}>
              <MainImgageCarousel selectedImage={selectedStyle.photos[topIndex].url} />
          </div>
            {(topIndex < selectedStyle.photos.length - 1) ? <FaChevronRight onClick={handleCarouselRightClick} /> : <FaChevronRight className='hidden' />}
        </div>
      : null
    }

    </div>
  )
}

export default MainImageGalleryComponent
