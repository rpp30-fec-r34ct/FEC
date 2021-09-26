import React from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const MainImgageCarouselComponent = ({ selectedImage }) => {


  const imgStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  }

  return(
    <img style={imgStyle} src={selectedImage} />
  )
}

export default MainImgageCarouselComponent
