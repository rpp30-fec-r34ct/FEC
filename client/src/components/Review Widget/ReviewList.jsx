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
    //whenever the filters get set i need to wipe everything clean and resend the request to the server so the server
    //can send back only reviews that fit the filter criteria
    /* I can't hold the filters in this components state, and i think moving this component to the review section would make the review section component too massive/responsible for too much
    so in order to maintain separation between this component and the review section component AND handle changing active filters, i have introduced a new state called 'filterChange'
    the actual state of filter change does not matter. It only matters that I can change that state in order to trigger the 'getReviews' after the reset of reviews has occured.
    */
    setReviews([]);
    if (reviewDisplayCount !== 2) {
      setDisplayCount(2)
    }
    filterChange ? setFilterChange(false) : setFilterChange(true)
  }, [props.activeFilters])


  //need to clear out all of the reviews so the section doesn't start displaying redundant data. Also, refreshing the display count
  //is a nice indicator to the user that their new filter has been applied.
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
        //this is protection for something i do not understand about the API yet. the API right now tells me there are 21 ratings for product 47421
        //and according to my understanding, you cannot have a rating without a review, so i should also be able to pull down 21 reviews for display
        //hOWEVER - the API will only give me 8 reviews. If i ask it for more than 8 on the same page it just returns 8. If i ask it for 8 on page 2, it for some reason skips to page 8 and returns no revies
        //that leads me to believe there is not a rating to review ratio of 1:1 even though there should be from what the spec says.
        //so - > here I am overwriting the maximum # of reviews so the uI knows to stop offering the 'more reviews button' if the client gets
        //no reviews after requesting them. i'll take this out once i understand why the rating count given by the  API doesn't match the review count

        if (data.data.length < 2) {
          setPullMoreReviews(0);
        }

        let newReviews = data.data;
        const reviewListTiles = []
        newReviews.map((reviewData) => { return (reviewListTiles.push(<ReviewTile key={reviewData.review_id} reviewData={reviewData} />)) })
        // return reviewListTiles;
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


  //only display the 'more reviews button if there are actually more reviews to display'
  const renderMoreBtn = (totalReviews) => {
    if (reviewDisplayCount < props.totalReviews && pullMoreReviews) {
      return <button onClick={moreReviews} className="moreReviewsButton">More Reviews</button>
    } else {
      return
    }
  }

  return (
    <div>
      <div className="sortAndCount">
        <span>{props.totalReviews + ' reviews, sorted by '}</span>
        <ReviewSortDropDown onSortTypeChange={onSortTypeChange} sortType={sortType}/>
        {/* if there are filters applied, then display them here in a span. Put a 'remove all filters' button next to it. use props.clearAllFilters to clear with onClick */}
      </div>
      <div className='reviewList'>{reviews}</div>
      <div>
        {renderMoreBtn()}
      </div>
    </div>
  )
}

export default ReviewList
