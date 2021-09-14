import React, { useState, useEffect } from 'react';
import AverageRating from './AverageRating.jsx';
import axios from 'axios';

const ReviewMetaData = (props) => {
  const [reviewsMeta, setReviewsMeta] = useState([]);

  useEffect(() => {
    getReviewsMeta();
  }, []);

  const getReviewsMeta = () => {
    axios.get('http://localhost:3000/reviews/meta', {
        params: {
          product_id: props.product_id
        }
      })
      .then ((data) => {
        setReviewsMeta(data.data);
      })
      .catch ((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>loaded</h1>
      <AverageRating reviewsMeta={reviewsMeta}/>
      {/* <RatingBreakdown ratings={props.ratings}/>
      <ProductCharacteristics characteristics={props.characteristics}/> */}
    </div>
  )
};

export default ReviewMetaData