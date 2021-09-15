import React, { useState, useEffect } from 'react'
import AverageRating from './AverageRating.jsx'
import axios from 'axios'

const ReviewMetaData = (props) => {
  const [reviewsMeta, setReviewsMeta] = useState({
    reviewsMeta: [],
    average: 0
  })

  useEffect(() => {
    getReviewsMeta()
  }, [])

  const getReviewsMeta = () => {
    axios.get('http://localhost:3000/reviews/meta', {
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

    currentAverage = currentAverage / reviewCount
    setReviewsMeta({
      reviewsMeta: data,
      average: currentAverage
    })
  }

  return (
    <div>
      <AverageRating average={reviewsMeta.average} />
      {/* <RatingBreakdown ratings={props.ratings}/>
      <ProductCharacteristics characteristics={props.characteristics}/> */}
    </div>
  )
}

export default ReviewMetaData
