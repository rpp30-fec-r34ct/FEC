import React from 'react';
import {useEffect, useState} from 'react';

const PhotoThumbnailRow = (props) => {

  const photoRowStyle = {
    height: '150px',
    width: '700px',
    // background: 'grey',
    margin: '10px',
    display: 'flex',
    flexDirection: 'row'
  }

  const photoThumbnailStyle = {
    width: '18%',
    height: '140px',
    overflow: 'hidden',
    margin: 'auto 10px',
    border: 'solid 2px grey',
    objectFit: 'cover',
  }

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  const getPhotoThumbs = (photos) => {
    let photosToRender = [];
    for (var i = 0; i < photos.length; i++) {
      photosToRender.push(
      <div key={photos[i].id} style={photoThumbnailStyle} >
        <img src={photos[i].url} style={imageStyle} onClick={props.onPhotoClick} />
      </div>)
    }

    return photosToRender;
  }


  return(
    <div className="PhotoRow" style={photoRowStyle}>
      {getPhotoThumbs(props.photos)}
    </div>
  )
}

export default PhotoThumbnailRow;