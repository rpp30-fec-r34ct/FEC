import React, { useEffect, useState } from "react";

let MainImageGalleryComponent = (props) => {
  const imgStyle = {
    "hight": "500px",
    "width": "500px"
  }
  return(
    <div>
      <h2>Image Gallery</h2>
      <img style={imgStyle} src={props.selectedStyle.photos[0].url}></img>
    </div>
  )
}

export default MainImageGalleryComponent;