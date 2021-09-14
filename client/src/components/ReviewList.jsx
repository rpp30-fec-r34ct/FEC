import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import axios from 'axios';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
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

  let reviewListTiles = [];
  reviews.map((reviewData) => {
    reviewListTiles.push(<ReviewTile reviewData={reviewData}/>);
  });

  return (
    <div className="ReviewList">{reviewListTiles}</div>
  )
};

export default ReviewList;
