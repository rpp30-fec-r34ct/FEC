import React, { useState, useEffect } from "react";

let MainImageGalleryComponent = (props) => {

  const [selectedStyle, setSelectedStyle] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (props.selectedStyle !== false) {
      setSelectedStyle(props.selectedStyle);
      setSelectedImage(props.selectedStyle.photos[0].url);
    }
  }, [props])

  useEffect(() => {
    if (selectedStyle !== false) {
      setThumbnails(selectedStyle.photos.map((image, index) => {
        return <img key={index} data-index={index} style={thumbnailStyle} src={image.thumbnail_url} onClick={imageClickHandler}></img>
      }))
    }
  }, [selectedStyle])

  const imageClickHandler = (e) => {
    e.preventDefault();
    setSelectedImage(selectedStyle.photos[e.target.getAttribute('data-index')].url)
  }

  const containerStyle = {
    "height": "500px",
    "width": "500px",
    "backgroundColor": "grey",
    "display": "flex",
    "justifyContent": "space-evenly",
    "overflow": "hidden"
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
      <div style={containerStyle}>
        <div style={listStyles}>
          {thumbnails}
        </div>
        <img style={imgStyle} src={selectedImage}></img>
      </div>
    </div>
  )
}

export default MainImageGalleryComponent;