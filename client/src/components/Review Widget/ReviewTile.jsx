import './cssFiles/reviewTile.css'
import ReviewStars from './ReviewStars.jsx'
import React from 'react'

const ReviewTile = (props) => {
  const translateDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = props.reviewData.date.slice(8, 10)
    const year = props.reviewData.date.slice(0, 4)
    const month = months[parseInt(props.reviewData.date.slice(5, 7)) - 1]
    const returnDate = month + ' ' + day + ', ' + year

    return returnDate
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
      <div className='tile_recommend'>I recommend this product</div>
      <div className='tile_response'>Response: {props.reviewData.response}</div>
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
