import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewMetaData from './ReviewMetaData.jsx';
import '../cssFiles/reviewSection.css';

const ReviewSection = (props) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);

  useEffect(() => {
      getReviews();
      getReviewsMeta();
  }, []);


  const getReviews = () => {
    axios.get('http://localhost:3000/reviews', {
        params: {
          sort: "newest",
          product_id: props.product_id
        }
      })
      .then ((data) => {
        setReviews(data.data.results);
      })
      .catch ((error) => {
      console.error(error);
    });
  };

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
      <h3>Ratings and Reviews</h3>
      <div className="flex-container reviewSection">
        <ReviewMetaData reviewsMeta={reviewsMeta}/>
        <ReviewList reviews={reviews}/>
      </div>
    </div>
  );
};

export default ReviewSection;