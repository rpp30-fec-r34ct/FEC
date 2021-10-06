import React, { useState, useEffect } from 'react';
import PhotoThumbnailRow from '../PhotoThumbnailRow.jsx'

const UploadPhotoBar = (props) => {

  const [uploadedPhotos, setPhotos] = useState([]);

  const onPhotoAdded = (event) => {
    let newPhotos = [...uploadedPhotos]

    newPhotos.push({url: URL.createObjectURL(event.target.files[0])})

    setPhotos(newPhotos);
    props.addNewUploadedPhoto(event.target.files[0])
  }

  const getRemainingUploads = () => {
    if (uploadedPhotos.length < 5) {
      return <input type="file" onChange={onPhotoAdded} accept="image/png, image/jpeg"/>
    }
  }

  const getPhotos = () => {
    if (uploadedPhotos.length !== 0) {
      return <PhotoThumbnailRow photos={uploadedPhotos} />
    } else {
      return null;
    }
  }

    return (
      <div>
        {getPhotos()}
        {getRemainingUploads()}
      </div>
    )
}

export default UploadPhotoBar