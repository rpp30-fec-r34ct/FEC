import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ReviewList from './ReviewList.jsx'
import ReviewMetaData from './ReviewMetaData.jsx'
import './cssFiles/reviewSection.css'
import axios from 'axios'
import ModalContainer from './ModalContainer.jsx'
import AddReviewModal from './AddReviewModal.jsx'



////TEST DATA BECAUSE THE PLANE DOES NOT HAVE WIFI
const testReviewsMeta = {
  "product_id": "47424",
  "ratings": {
      "2": "1",
      "4": "2",
      "5": "2"
  },
  "recommended": {
      "false": "1",
      "true": "4"
  },
  "characteristics": {
      "Fit": {
          "id": 159168,
          "value": "3.8000000000000000"
      },
      "Length": {
          "id": 159169,
          "value": "3.8000000000000000"
      },
      "Comfort": {
          "id": 159170,
          "value": "3.8000000000000000"
      },
      "Quality": {
          "id": 159171,
          "value": "3.8000000000000000"
      }
  }
}


////END TEST DATA

const ReviewSection = () => {
  const { productId } = useParams()

  //without test data
  // const [reviewsMeta, setReviewsMeta] = useState({
  //   ratings: null,
  //   recommended: {
  //     false: 0,
  //     true: 0
  //   },
  //   product_id: productId
  // })

  //with test data
  const [reviewsMeta, setReviewsMeta] = useState(testReviewsMeta)

  const [activeFilters, setActiveFilters] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  })

  const [activeModal, setActiveModal] = useState('')
  const [isAddReview, setAddReview] = useState(0);

  // useEffect(() => {
  //   getReviewsMeta()
  // }, [])

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
    let reviewCount = 0

    if (reviewsMeta.ratings !== null) {
      for (const key in reviewsMeta.ratings) {
        reviewCount = reviewCount + parseInt(reviewsMeta.ratings[key])
      }
    }
    return reviewCount
  }

  const onHandleFilterToggle = (event) => {
    const ratingSelected = event.target.innerText[0]
    let newFilters = {}
    let trueCount = 0
    Object.assign(newFilters, activeFilters)
    let allActive = true

    for (const key in newFilters) {
      if (newFilters[key] === false) {
        allActive = false
      }
    }
    if (allActive) {
      for (const key in newFilters) {
        if (key !== ratingSelected) {
          newFilters[key] = false
        }
      }
    } else {
      for (const key in newFilters) {
        if (key === ratingSelected) {
          newFilters[key] ? newFilters[key] = false : newFilters[key] = true
        }
        if (newFilters[key]) {
          trueCount = trueCount + 1
        }
      }

      // once we've toggled the filters as requested, if we are back to having all filters set to false, then we are in a default state. Turn all filters to true
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

    setActiveFilters(newFilters)
  }

  const handleClearFilter = () => {
    const newFilters = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    }
    setActiveFilters(newFilters)
  }

  const onPhotoClick = (event) => {
    setActiveModal(event.target.src)
  }

  const onClickClose = (event) => {
    setActiveModal('')
  }

  const onAddReviewClick = (event) => {
    setAddReview(isAddReview ? 0 : 1) ;
  }


  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='reviewSection'>
        <ReviewMetaData metaData={reviewsMeta} totalReviews={getTotalReviews()} onHandleFilterToggle={onHandleFilterToggle} activeFilters={activeFilters} handleClearFilter={handleClearFilter} />
        <ReviewList product_id={productId} totalReviews={getTotalReviews()} activeFilters={activeFilters} onPhotoClick={onPhotoClick} onAddReviewClick={onAddReviewClick}/>
        <ModalContainer activeModal={activeModal} onClickClose={onClickClose} />
        <AddReviewModal productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta}/>
      </div>
    </div>
  )
}

export default ReviewSection
