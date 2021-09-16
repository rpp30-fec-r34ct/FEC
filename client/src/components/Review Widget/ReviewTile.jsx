import React, { useState } from 'react';
import './ReviewSection.jsx'
import './cssFiles/reviewTile.css';
import ReviewStars from './ReviewStars.jsx';

const ReviewTile = (props) => {
  return (
    <div className="flex-container reviewTile">
      <div className="tile_user_date_rating flex-container">
      <ReviewStars starRating={props.reviewData.rating}/>
        <div className="tile_user_date">
          <span className="tile_userName">{props.reviewData.reviewer_name}</span>
          <span className="tile_date">{props.reviewData.date}</span>
        </div>
      </div>
      <div className="tile_summary">{props.reviewData.summary}</div>
      <div className="tile_body">{props.reviewData.body}</div>
      <div className="tile_recommend">I recommend this product</div>
      <div className="tile_response">Response: {props.reviewData.response}</div>
      <div className="tile_helpfulSection">
        <span>Helfpul?</span>
        <span className="tile_helpfulVote">Yes</span>
        <span className="tile_helpfulCount">{'(' + props.reviewData.helpfulness + ')'}</span>
        <span className="tile_report">{' | ' + 'Report'}</span>
      </div>

    </div>
  );
};

export default ReviewTile;