import React, { useState, useEffect } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(false)
  const [selectedImage, setSelectedImage] = useState()
  const [thumbnails, setThumbnails] = useState([])
  const [topIndex, setTopIndex] = useState(2)

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

  const containerStyle = {
    height: '500px',
    width: '500px',
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }

  const imgStyle = {
    maxHeight: '100%',
    maxWidth: '100%'
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
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }

  return (
    <div>
      <div style={containerStyle}>
        <div style={listStyles}>
          {(topIndex > 0) && <FaChevronUp className='up-arrow' />}
          {thumbnails}
          {(topIndex < thumbnails.length - 1) && <FaChevronDown className='down-arrow' />}
        </div>
        <img style={imgStyle} src={selectedImage} />
      </div>
    </div>
  )
}

export default MainImageGalleryComponent
