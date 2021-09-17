import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewStars from './ReviewStars.jsx'

const ReviewMetaData = (props) => {
  const [reviewsMeta, setReviewsMeta] = useState({
    reviewsMeta:
    {
        product_id: 1,
        recommended: {
          false: "0",
          true: "0"
        }
    },
    average: 0,
    percentRecommend: 0,
  })

  useEffect(() => {
    getReviewsMeta ();
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

  const calculatePercentRecommend = (currentAverage, data) => {

    let noCount = parseInt(data.recommended.false);
    let yesCount = parseInt(data.recommended.true);

    setReviewsMeta({
      reviewsMeta: data,
      average: currentAverage,
      percentRecommend: Math.round((yesCount / (noCount + yesCount === 0 ? 1 : (noCount + yesCount))) * 100)
    });

  }

  const calculateAverage = (data) => {
    let currentAverage = 0
    let reviewCount = 0

    for (const key in data.ratings) {
      currentAverage = currentAverage + parseInt(key) * parseInt(data.ratings[key])
      reviewCount = reviewCount + parseInt(data.ratings[key])
    }

    currentAverage = Math.round((currentAverage / reviewCount) * 10) / 10
    calculatePercentRecommend(currentAverage, data);
  }

  return (
    <div>
      <div className='reviewSummary'>
        <div className='ratingItem'>{reviewsMeta.average}</div>
        <ReviewStars className='ratingItem' starRating={reviewsMeta.average} review_id={reviewsMeta.reviewsMeta.product_id}/>
        {/* <RatingBreakdown ratings={props.ratings}/>
        <ProductCharacteristics characteristics={props.characteristics}/> */}
      </div>
      <span className='percentRecommend'>{reviewsMeta.percentRecommend + '% of reviews recommend this product'}</span>
    </div>

  )
}

export default ReviewMetaData
