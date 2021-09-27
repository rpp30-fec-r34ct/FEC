import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewSortDropDown from './ReviewSortDropDown.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([])
  const [reviewDisplayCount, setDisplayCount] = useState(2)
  const [pullMoreReviews, setPullMoreReviews] = useState(1)
  const [sortType, setSortType] = useState('relevance')
  const [filterChange, setFilterChange] = useState(false)


  useEffect(() => {
    getReviews(reviewDisplayCount, props.product_id, sortType, props.activeFilters)
  }, [sortType, reviewDisplayCount, filterChange])

  useEffect(() => {
    setReviews([]);
    if (reviewDisplayCount !== 2) {
      setDisplayCount(2)
    }
    filterChange ? setFilterChange(false) : setFilterChange(true)
  }, [props.activeFilters])

  const onSortTypeChange = (event) =>  {
    setReviews([]);
    setDisplayCount(2);
    setSortType(event.target.innerText);
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
          setPullMoreReviews(0);
        }

        let newReviews = data.data;
        const reviewListTiles = []
        newReviews.map((reviewData) => { return (reviewListTiles.push(<ReviewTile key={reviewData.review_id} reviewData={reviewData} />)) })
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
      setDisplayCount(props.totalReviews);
    }
  }

  const renderMoreBtn = (totalReviews) => {
    if (reviewDisplayCount < props.totalReviews && pullMoreReviews) {
      return <button onClick={moreReviews} className="moreReviewsButton">More Reviews</button>
    } else {
      return
    }
  }

  const getFilterDisplay = (filters, clearFunction) => {
    let count = 0;
    let filterList = []
    for (var key in filters) {
      if (filters[key] === true) {
        filterList.push(
          <span key={count}>{key + ' stars'}</span>
        )
      }
      count = count + 1;
    }

    if (filterList.length !== 5) {
      return (
        <div className="appliedFilters">
          <span>Applied filters: </span>
          {filterList}
          <button onClick={clearFunction}>Remove all filters</button>
        </div>
      )
    } else {
      return;
    }
  }

  return (
    <div>
      <div className="sortAndCount">
        <span>{props.totalReviews + ' reviews, sorted by '}</span>
        <ReviewSortDropDown onSortTypeChange={onSortTypeChange} sortType={sortType}/>
        {getFilterDisplay(props.activeFilters, props.clearAllFilters)}
      </div>
      <div className='reviewList'>{reviews}</div>
      <div>
        {renderMoreBtn()}
      </div>
    </div>
  )
}

export default ReviewList
