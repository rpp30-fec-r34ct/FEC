import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios'
import './cssFiles/reviewSection.css'

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews()
  }, [])

  const getReviews = () => {
    axios.get('http://localhost:3000/reviews', {
      params: {
        sort: 'newest',
        product_id: props.product_id
      }
    })
      .then((data) => {
        setReviews(data.data.results)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const reviewListTiles = []
  reviews.map((reviewData) => { return (reviewListTiles.push(<ReviewTile reviewData={reviewData} />)) })

  return (
    <div className='reviewList'>{reviewListTiles}</div>
  )
}

export default ReviewList
