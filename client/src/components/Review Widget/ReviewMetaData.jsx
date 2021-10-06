/* eslint-disable */
import React from 'react'
import './cssFiles/reviewSection.css'
import ReviewStars from './ReviewStars.jsx'
import BarChart from './BarChart.jsx'
import ProductBreakdown from './ProductBreakdown.jsx'

const ReviewMetaData = (props) => {
  const calculatePercentRecommend = (noStr, yesStr) => {
    const noCount = parseInt(noStr)
    const yesCount = parseInt(yesStr)

    return Math.round((yesCount / (noCount + yesCount === 0 ? 1 : (noCount + yesCount))) * 100)
  }

  const calculateAverage = (ratingsObj) => {
    let currentAverage = 0
    let reviewCount = 0

    if (ratingsObj !== null) {
      for (const key in ratingsObj) {
        currentAverage = currentAverage + parseInt(key) * parseInt(ratingsObj[key])
        reviewCount = reviewCount + parseInt(ratingsObj[key])
      }
    }

    if (currentAverage !== 0) {
      currentAverage = Math.round((currentAverage / reviewCount) * 10) / 10
    }

    return currentAverage
  }

  const getFilterDisplay = (filters) => {
    let count = 0
    const filterList = []
    for (const key in filters) {
      if (filters[key] === true) {
        filterList.push(
          <span key={count}>{key + ' stars, '}</span>
        )
      }
      count = count + 1
    }

    if (filterList.length !== 5) {
      return (
        <div>
          <div className='appliedFilters'>
            <div>
              <span>{'Applied filters: '}</span>
              {filterList}
            </div>
          </div>
          <button className='removeFiltersBtn' onClick={props.handleClearFilter}>Remove all filters</button>
        </div>
      )
    }
  }

  return (
    <div>
      <div>
        <div className='reviewSummary'>
          <div data-testid='testAverage' className='ratingItem'>{calculateAverage(props.metaData.ratings)}</div>
          <ReviewStars data-testid='testAverageStars' starRating={calculateAverage(props.metaData.ratings)} review_id={props.metaData.product_id} />
        </div>
        <span data-testid='testPercent' className='percentRecommend'>{calculatePercentRecommend(props.metaData.recommended.false, props.metaData.recommended.true) + '% of reviews recommend this product'}</span>
      </div>
      <div className='ratingBreakDown'>
        <span className='ratingBreakdownTitle'>Rating Breakdown</span>
        {getFilterDisplay(props.activeFilters)}
        <BarChart breakDownRatings={props.metaData.ratings} totalReviews={props.totalReviews} onHandleFilterToggle={props.onHandleFilterToggle} />
      </div>
      <ProductBreakdown characteristicsData={props.metaData.characteristics} />
    </div>
  )
}

export default ReviewMetaData
