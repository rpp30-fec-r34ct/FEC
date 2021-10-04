import React, { useState } from 'react';

const PhotoUploadBar = () => {

  const [photos, setPhotoCount] = useState([]);


  return (

    <div>
      <span>{'Upload your photos (up to five): '}</span>
      <br></br>
    </div>
    <label htmlFor="img">{'Upload you photos (up to five): '}
    <br></br>
    <input type="file" id="img" name="img" accept="image/*"/>
  </label>
  )
}