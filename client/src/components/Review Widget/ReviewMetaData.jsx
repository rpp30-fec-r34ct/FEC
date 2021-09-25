import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewStars from './ReviewStars.jsx'
import BarChart from './BarChart.jsx';
import ProductBreakdown from './productBreakdown.jsx';

const ReviewMetaData = (props) => {
  const [reviewsMeta, setReviewsMeta] = useState({
    reviewsMeta:
    {
      product_id: 1,
      recommended: {
        false: '0',
        true: '0'
      },
      ratings: {
        1: '3'
      }
    },
    average: 0,
    percentRecommend: 0,
    totalReviews: 0
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
        setReviewsMeta(data.data)
        // calculateAverage(data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const calculatePercentRecommend = (currentAverage, data, reviewCount) => {
    const noCount = parseInt(data.recommended.false)
    const yesCount = parseInt(data.recommended.true)

    // setReviewsMeta({
    //   reviewsMeta: data,
    //   average: currentAverage,
    //   percentRecommend: Math.round((yesCount / (noCount + yesCount === 0 ? 1 : (noCount + yesCount))) * 100),
    //   totalReviews: reviewCount
    // })
  }

  const calculateAverage = (data) => {
    let currentAverage = 0
    let reviewCount = 0

    for (const key in data.ratings) {
      currentAverage = currentAverage + parseInt(key) * parseInt(data.ratings[key])
      reviewCount = reviewCount + parseInt(data.ratings[key])
    }

    currentAverage = Math.round((currentAverage / reviewCount) * 10) / 10
    calculatePercentRecommend(currentAverage, data, reviewCount)
  }

  return (
    <div>
      <div>
        <div className='reviewSummary'>
          <div data-testid='testAverage' className='ratingItem'>{reviewsMeta.average}</div>
          <ReviewStars data-testid='testAverageStars' starRating={reviewsMeta.average} review_id={reviewsMeta.reviewsMeta.product_id} />
        </div>
        <span data-testid='testPercent' className='percentRecommend'>{reviewsMeta.percentRecommend + '% of reviews recommend this product'}</span>
      </div>
      <div className="ratingBreakDown">
        <span className="ratingBreakdownTitle">Rating Breakdown</span>
        <BarChart breakDownRatings={reviewsMeta.reviewsMeta.ratings} totalReviews={reviewsMeta.totalReviews}/>
      </div>
        <ProductBreakdown characteristicsData={reviewsMeta.reviewsMeta.characteristics} />
    </div>
  )
}

export default ReviewMetaData