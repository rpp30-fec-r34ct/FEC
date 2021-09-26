import React from 'react';

const TestPhotos = [
  {
      "id": 1476026,
      "url": "https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
  },
  {
      "id": 1476027,
      "url": "https://images.unsplash.com/photo-1549812474-c3cbd9a42eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
      "id": 1476028,
      "url": "https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
    "id": 1476029,
    "url": "https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
    "id": 1476030,
    "url": "https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  }
]

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
      <div key={photos[i].id} style={photoThumbnailStyle}>
        <img src={photos[i].url} style={imageStyle}/>
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