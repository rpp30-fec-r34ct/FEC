import React from 'react'

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
