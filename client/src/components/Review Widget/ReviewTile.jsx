import './cssFiles/reviewTile.css'
import ReviewStars from './ReviewStars.jsx'
import React from 'react'

const ReviewTile = (props) => {

  const translateDate = (date) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = date.slice(8, 10);
    let year = date.slice(0,4);
    let month = months[parseInt(date.slice(5,7))];
    let returnDate = month + ' ' + day + ', ' + year;


    return returnDate;
  }


  return (
    <div className='flex-container reviewTile'>
      <div className='tile_user_date_rating flex-container'>
        <ReviewStars starRating={props.reviewData.rating} review_id={props.reviewData.review_id}/>
        <div className='tile_user_date'>
          <span className='tile_userName'>{props.reviewData.reviewer_name}</span>
          <span className='tile_date'>{translateDate(props.reviewData.date)}</span>
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
