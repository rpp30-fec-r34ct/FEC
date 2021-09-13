import React, { useEffect, useState } from "react";

let MainImageGalleryComponent = (props) => {

  const [selectedImage, setSelectedImage] = useState(props.selectedStyle.photos[0].url)

  const containerStyle = {
    "height": "500px",
    "width": "500px",
    "backgroundColor": "grey",
    "display": "flex",
    "justifyContent": "space-evenly"
  }

  const imgStyle = {
    "maxHeight": "100%",
    "maxWidth": "100%"
  }

  const thumbnailStyle = {
    "height": "75px",
    "width": "75px",
    "border": "solid, 2px, black",
  }

  const listStyles = {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "space-evenly"
  }

  return(
    <div>
      <h2>Image Gallery</h2>
      <div style={containerStyle}>
        <div style={listStyles}>
        {props.selectedStyle.photos.map((image, index) => {
          return <img key={index} style={thumbnailStyle} src={image.thumbnail_url}></img>
        })}
        </div>
        <img style={imgStyle} src={selectedImage}></img>
      </div>
    </div>
  )
}

export default MainImageGalleryComponent;