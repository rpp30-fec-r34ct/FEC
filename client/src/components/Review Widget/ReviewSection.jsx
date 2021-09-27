import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ReviewList from './ReviewList.jsx'
import ReviewMetaData from './ReviewMetaData.jsx'
import './cssFiles/reviewSection.css'
import axios from 'axios';

const ReviewSection = () => {
  const { productId } = useParams()

  const [reviewsMeta, setReviewsMeta] = useState({
    ratings: null,
    recommended: {
      false: 0,
      true: 0
    },
    product_id: productId
  })

  const [activeFilters, setActiveFilters] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  })


  useEffect(() => {
    getReviewsMeta()
  }, [])

  const getReviewsMeta = () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: productId
      }
    })
      .then((data) => {
        setReviewsMeta(data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getTotalReviews = () => {
    let reviewCount = 0;

    if (reviewsMeta.ratings !== null) {
      for (let key in reviewsMeta.ratings) {
        reviewCount = reviewCount + parseInt(reviewsMeta.ratings[key])
      }
    }
    return reviewCount;
  }

  const handleFilterToggle = (event) => {
    let ratingSelected = event.target.innerText[0]
    let newFilters = {};
    let trueCount = 0;
    Object.assign(newFilters, activeFilters)
    let allActive = true;

    for (var key in newFilters) {
      if (newFilters[key] === false) {
        allActive = false;
      }
    }
    if (allActive) {
      for (var key in newFilters) {
        if (key !== ratingSelected) {
          newFilters[key] = false;
        }
      }
    } else {
      for (var key in newFilters) {
        if (key === ratingSelected) {
          newFilters[key] ? newFilters[key] = false : newFilters[key] = true
        }
        if (newFilters[key]) {
          trueCount = trueCount + 1;
        }
      }

      //once we've toggled the filters as requested, if we are back to having all filters set to false, then we are in a default state. Turn all filters to true
      if (trueCount === 0) {
        newFilters = {
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
      }
    }

    setActiveFilters(newFilters);
  }

  const clearAllFilters = () => {
    let newFilters = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    }
    setActiveFilters(newFilters);
  }


  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='reviewSection'>
        <ReviewMetaData metaData={reviewsMeta} totalReviews={getTotalReviews()} handleFilterToggle={handleFilterToggle}/>
        <ReviewList product_id={productId} totalReviews={getTotalReviews()} activeFilters={activeFilters} clearAllFilters={clearAllFilters} />
      </div>
    </div>
  )
}

export default ReviewSection
