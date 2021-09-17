import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewStars from './ReviewStars.jsx'

const ReviewMetaData = (props) => {
  const [reviewsMeta, setReviewsMeta] = useState({
    reviewsMeta:
    {
        product_id: 1
    },
    average: 0
  })

  useEffect(() => {
    getReviewsMeta()
  }, [])

  const getReviewsMeta = () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: props.product_id
      }
    })
      .then((data) => {
        calculateAverage(data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const calculateAverage = (data) => {
    let currentAverage = 0
    let reviewCount = 0

    for (const key in data.ratings) {
      currentAverage = currentAverage + parseInt(key) * parseInt(data.ratings[key])
      reviewCount = reviewCount + parseInt(data.ratings[key])
    }

    currentAverage = Math.round((currentAverage / reviewCount) * 10) / 10
    setReviewsMeta({
      reviewsMeta: data,
      average: currentAverage
    })
  }

  return (
    <div className='reviewSummary'>
      <div className='ratingItem'>{reviewsMeta.average}</div>
      <ReviewStars className='ratingItem' starRating={reviewsMeta.average} review_id={reviewsMeta.reviewsMeta.product_id}/>
      {/* <RatingBreakdown ratings={props.ratings}/>
      <ProductCharacteristics characteristics={props.characteristics}/> */}
    </div>
  )
}

export default ReviewMetaData
