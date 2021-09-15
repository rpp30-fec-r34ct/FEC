import React, { useState, useEffect } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(false)
  const [selectedImage, setSelectedImage] = useState()
  const [thumbnails, setThumbnails] = useState([])
  const [topIndex, setTopIndex] = useState(0)

  useEffect(() => {
    if (props.selectedStyle !== false) {
      setSelectedStyle(props.selectedStyle)
      setSelectedImage(props.selectedStyle.photos[0].url)
    }
  }, [props])

  useEffect(() => {
    if (selectedStyle !== false) {
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return <img key={index} data-index={index} style={thumbnailStyle} src={image.thumbnail_url} onClick={imageClickHandler} />
      }))
    }
  }, [selectedStyle])

  const imageClickHandler = (e) => {
    e.preventDefault()
    setSelectedImage(selectedStyle.photos[e.target.getAttribute('data-index')].url)
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

  const containerStyle = {
    height: '500px',
    width: '500px',
    display: 'flex',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }

  const imgStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  }

  const thumbnailStyle = {
    height: '75px',
    width: '75px',
    border: 'solid, 2px, black'
  }

  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  }

  const carouselListStyles = {
    transform: `translateY(-${topIndex * 75}px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }

  return (
    <div>
      <div style={containerStyle}>
        <div style={listStyles}>
          {(topIndex > 0) ? <FaChevronUp className='up-arrow' onClick={handleCarouselUpClick} /> : <FaChevronUp className='hidden' />}
          <div style={{ maxHeight: '375px', overflow: 'hidden' }}>
            <div style={carouselListStyles}>
              {thumbnails}
            </div>
          </div>
          {(topIndex < thumbnails.length - 5) ? <FaChevronDown className='down-arrow' onClick={handleCarouselDownClick} /> : <FaChevronDown className='hidden' />}
        </div>
        <div style={{ width: '400px', height: '500px', overflow: 'hidden' }}>
          <img style={imgStyle} src={selectedImage} />
        </div>
      </div>
    </div>
  )
}

export default MainImageGalleryComponent
