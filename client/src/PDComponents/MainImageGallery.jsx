import React, { useState, useEffect } from 'react'
// import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import ThumbnailCarousel from './ThumbnailCarousel.jsx'

const MainImageGalleryComponent = (props) => {
  const [selectedStyle, setSelectedStyle] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  // const [topIndex, setTopIndex] = useState(0)

  useEffect(() => {
    if (props.selectedStyle) {
      setSelectedStyle(props.selectedStyle)
      setSelectedImage(props.selectedStyle.photos[0].url)
    }
  }, [props])

  const imageClickHandler = (e) => {
    e.preventDefault()
    setSelectedImage(selectedStyle.photos[e.target.getAttribute('data-index')].url)
  }

  // const handleCarouselUpClick = () => {
  //   setTopIndex(prevIndex => {
  //     return prevIndex - 1
  //   })
  // }

  // const handleCarouselDownClick = () => {
  //   setTopIndex(prevIndex => {
  //     return prevIndex + 1
  //   })
  // }

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

  const skeletonImg = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    backgroundColor: 'Gainsboro'
  }

  // const listStyles = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   overflow: 'hidden'
  // }

  // const carouselListStyles = {
  //   transform: `translateY(-${topIndex * 77}px)`,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly'
  // }

  return (
    <div>
      <div style={containerStyle}>
        <ThumbnailCarousel selectedStyle={selectedStyle} imageClickHandler={imageClickHandler} />
        <div style={{ width: '400px', height: '500px', overflow: 'hidden' }}>
          {selectedImage ? <img style={imgStyle} src={selectedImage} /> : <img style={skeletonImg} />}
        </div>
      </div>
    </div>
  )
}

export default MainImageGalleryComponent
