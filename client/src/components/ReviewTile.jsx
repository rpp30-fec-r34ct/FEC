import React, { useState } from 'react';
import './ReviewSection.jsx'
import '../cssFiles/reviewTile.css';

const ReviewTile = (props) => {
  if (props.reviewData.response === null) {
    if (props.reviewData.recommend === false) {
      return (
        <div className="flex-container reviewTile">
          <div className="tile_user_date_rating flex-container">
          <span className="tile_rating">{props.reviewData.rating}</span>
            <div className="tile_user_date">
              <span className="tile_userName">{props.reviewData.reviewer_name}</span>
              <span className="tile_date">{props.reviewData.date}</span>
            </div>
          </div>
          <div className="tile_summary">{props.reviewData.summary}</div>
          <div className="tile_body">{props.reviewData.body}</div>
        </div>
      );
    } else {
      return (
        <div className="flex-container reviewTile">
          <div className="tile_user_date_rating flex-container">
          <span className="tile_rating">{props.reviewData.rating}</span>
            <div className="tile_user_date">
              <span className="tile_userName">{props.reviewData.reviewer_name}</span>
              <span className="tile_date">{props.reviewData.date}</span>
            </div>
          </div>
          <div className="tile_summary">{props.reviewData.summary}</div>
          <div className="tile_body">{props.reviewData.body}</div>
          <div className="tile_recommend">I recommend this product</div>
        </div>
      );
    }
  } else {
    if (props.reviewData.recommend === false) {
      return (
        <div className="flex-container reviewTile">
          <div className="tile_user_date_rating flex-container">
          <span className="tile_rating">{props.reviewData.rating}</span>
            <div className="tile_user_date">
              <span className="tile_userName">{props.reviewData.reviewer_name}</span>
              <span className="tile_date">{props.reviewData.date}</span>
            </div>
          </div>
          <div className="tile_summary">{props.reviewData.summary}</div>
          <div className="tile_body">{props.reviewData.body}</div>
          <div className="tile_response">Response: {props.reviewData.response}</div>
        </div>
      );
    } else {
      return (
        <div className="flex-container reviewTile">
          <div className="tile_user_date_rating flex-container">
          <span className="tile_rating">{props.reviewData.rating}</span>
            <div className="tile_user_date">
              <span className="tile_userName">{props.reviewData.reviewer_name}</span>
              <span className="tile_date">{props.reviewData.date}</span>
            </div>
          </div>
          <div className="tile_summary">{props.reviewData.summary}</div>
          <div className="tile_body">{props.reviewData.body}</div>
          <div className="tile_recommend">I recommend this product</div>
          <div className="tile_response">Response: {props.reviewData.response}</div>
        </div>
      );
    }
  }

};

export default ReviewTile;