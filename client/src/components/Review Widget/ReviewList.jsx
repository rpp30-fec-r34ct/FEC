import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewSortDropDown from './ReviewSortDropDown.jsx'


const ReviewList = (props) => {
  // const [reviews, setReviews] = useState([])
  const [reviewDisplayCount, setDisplayCount] = useState(2)
  const [pullMoreReviews, setPullMoreReviews] = useState(1)
  const [sortType, setSortType] = useState('relevance')
  const [filterChange, setFilterChange] = useState(false)
  const [isAddReviewActive, setAddReview] = useState(0);

//test reviews state only
const [reviews, setReviews] = useState([])

  // useEffect(() => {
  //   getReviews(reviewDisplayCount, props.product_id, sortType, props.activeFilters)
  // }, [sortType, reviewDisplayCount, filterChange])

  useEffect(() => {
    setReviews([])
    setPullMoreReviews(1)
    if (reviewDisplayCount !== 2) {
      setDisplayCount(2)
    }
    filterChange ? setFilterChange(false) : setFilterChange(true)
  }, [props.activeFilters])

  const onSortTypeChange = (event) => {
    setReviews([])
    setDisplayCount(2)
    setSortType(event.target.innerText)
  }

  const getReviews = (count, productId, sortType, activeFilters) => {
    axios.get('/reviews', {
      params: {
        count: count,
        sort: sortType,
        product_id: productId,
        activeFilters: activeFilters
      }
    })
      .then((data) => {
        if (data.data.length < 2) {
          setPullMoreReviews(0)
        }

        const newReviews = data.data
        const reviewListTiles = []
        newReviews.map((reviewData) => { return (reviewListTiles.push(<ReviewTile key={reviewData.review_id} reviewData={reviewData} onPhotoClick={props.onPhotoClick} />)) })
        setReviews(reviews.concat(reviewListTiles))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const moreReviews = () => {
    if (reviewDisplayCount < props.totalReviews && pullMoreReviews) {
      setDisplayCount(reviewDisplayCount + 2)
    } else {
      setDisplayCount(props.totalReviews)
    }
  }

  const renderMoreBtn = (totalReviews) => {
    if (reviewDisplayCount < props.totalReviews && pullMoreReviews) {
      return <button onClick={moreReviews} className='reviewsBtn'>More Reviews</button>
    }
  }


  return (
    <div>
      <div className='sortAndCount'>
        <span>{props.totalReviews + ' reviews, sorted by '}</span>
        <ReviewSortDropDown onSortTypeChange={onSortTypeChange} sortType={sortType} />
      </div>
      <div className='reviewList'>{reviews}</div>
      <div>
        {renderMoreBtn()}
        <button className="reviewsBtn" onClick={props.onAddReviewClick}>Add Review +</button>
      </div>
    </div>
  )
}

export default ReviewList
