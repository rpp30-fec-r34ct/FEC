import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';

const ReviewSection = (props) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);

  useEffect(() => {
      getReviews();
  },[])


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



  return (
    <div>
      <ReviewList reviews={reviews}/>
      <h2>details for {props.product_id}</h2>
    </div>
  );
};

export default ReviewSection;