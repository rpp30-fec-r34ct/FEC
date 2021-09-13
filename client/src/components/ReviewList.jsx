import React, { useState } from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = (props) => {
  var reviewListTiles = [];
  var reviews = props.reviews.map((reviewData) => {
    reviewListTiles.push(<ReviewTile reviewData={reviewData}/>);
  });

  return (
    <div className="ReviewList">{reviewListTiles}</div>
  )
};

export default ReviewList;