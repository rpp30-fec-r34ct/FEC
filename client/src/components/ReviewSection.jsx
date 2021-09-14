import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewMetaData from './ReviewMetaData.jsx';
import '../cssFiles/reviewSection.css';

const ReviewSection = (props) => {
  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className="flex-container reviewSection">
        <ReviewMetaData product_id={props.product_id}/>
        <ReviewList product_id={props.product_id}/>
      </div>
    </div>
  );
};

export default ReviewSection;