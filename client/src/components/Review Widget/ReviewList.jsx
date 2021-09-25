import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios'
import './cssFiles/reviewSection.css'

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([])
  const [reviewDisplayCount, setDisplayCount] = useState(2)

  useEffect(() => {
    getReviews(reviewDisplayCount, props.product_id)
  }, [])

  const getReviews = (count, productId) => {
    axios.get('/reviews', {
      params: {
        count: count,
        product_id: productId
      }
    })
      .then((data) => {
        // setReviews(data.data.results)
        let reviews = data.data.results;
        const reviewListTiles = []
        reviews.map((reviewData) => { return (reviewListTiles.push(<ReviewTile key={reviewData.review_id} reviewData={reviewData} />)) })
        // return reviewListTiles;
        setReviews(reviewListTiles)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const moreReviews = () => {
    if (reviewDisplayCount < props.totalReviews) {
      setDisplayCount(reviewDisplayCount + 2)
      getReviews(reviewDisplayCount + 2);
    } else {
      setDisplayCount(props.totalReviews);
      getReviews(props.totalReviews);
    }
  }


  //only display the 'more reviews button if there are actually more reviews to display'
  if (reviewDisplayCount < props.totalReviews) {
    return (
      <div>
        <div className='reviewList'>{reviews}</div>
        <div>
          <button onClick={moreReviews}>More Reviews</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='reviewList'>{reviews}</div>
      </div>
    )
  }
}

export default ReviewList
