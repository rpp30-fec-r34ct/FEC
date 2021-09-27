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
  const [sortType, setSortType] = useState('relevance')

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
      for (const key in reviewsMeta.ratings) {
        reviewCount = reviewCount + parseInt(reviewsMeta.ratings[key])
      }
    }

    return reviewCount;
  }



  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='reviewSection'>
        <ReviewMetaData metaData={reviewsMeta} totalReviews={getTotalReviews()}/>
        <ReviewList product_id={productId} totalReviews={getTotalReviews()} sortType={sortType} />
      </div>
    </div>
  )
}

export default ReviewSection
