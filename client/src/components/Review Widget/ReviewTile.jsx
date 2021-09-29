import './cssFiles/reviewTile.css'
import ReviewStars from './ReviewStars.jsx'
import React from 'react'
import PhotoThumbnailRow from './PhotoThumbnailRow.jsx'

const ReviewTile = (props) => {
  const translateDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = props.reviewData.date.slice(8, 10)
    const year = props.reviewData.date.slice(0, 4)
    const month = months[parseInt(props.reviewData.date.slice(5, 7)) - 1]
    const returnDate = month + ' ' + day + ', ' + year

    return returnDate
  }

  const getIsRecommended = (recommended) => {
    if (recommended) {
      return (
        <div className='tile_recommend'>
          <i className='fas fa-check' style={{ color: 'green' }} />
          <span> I recommend this product</span>
        </div>
      )
    }
  }

  const getResponse = (response) => {
    if (response !== null && response !== '') {
      return <div className='tile_response'>Response: {response}</div>
    }
  }

  const getPhotos = (photos) => {
    if (photos.length !== 0) {
      return <PhotoThumbnailRow photos={props.reviewData.photos} onPhotoClick={props.onPhotoClick} />
    }
  }

  return (
    <div className='reviewTile'>
      <div className='tile_user_date_rating'>
        <ReviewStars starRating={props.reviewData.rating} review_id={props.reviewData.review_id} />
        <div className='tile_user_date'>
          <span className='tile_userName'>{props.reviewData.reviewer_name}</span>
          <span data-testid='testReviewTileDate' className='tile_date'>{translateDate()}</span>
        </div>
      </div>
      <div className='tile_summary'>{props.reviewData.summary}</div>
      <div className='tile_body'>{props.reviewData.body}</div>
      {getPhotos(props.reviewData.photos)}
      {getIsRecommended(props.reviewData.recommend)}
      {getResponse(props.reviewData.response)}
      <div className='tile_helpfulSection'>
        <span>Helfpul?</span>
        <span className='tile_helpfulVote'>Yes</span>
        <span className='tile_helpfulCount'>{'(' + props.reviewData.helpfulness + ')'}</span>
        <span className='tile_report'>{' | ' + 'Report'}</span>
      </div>
    </div>
  )
}

export default ReviewTile
