import React, { useState, useEffect } from 'react'
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios'
import './cssFiles/reviewSection.css'
import ReviewSortDropDown from './ReviewSortDropDown.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([])
  const [reviewDisplayCount, setDisplayCount] = useState(2)
  const [pullMoreReviews, setPullMoreReviews] = useState(1)

  useEffect(() => {
    getReviews(reviewDisplayCount, props.product_id, props.sortType)
  }, [])



  const getReviews = (count, productId, sortType) => {
    axios.get('/reviews', {
      params: {
        count: count,
        sort: sortType,
        product_id: productId
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
      getReviews(reviewDisplayCount + 2, props.product_id);
    } else {
      setDisplayCount(props.totalReviews);
      getReviews(props.totalReviews, props.product_id);
    }
  }


  //only display the 'more reviews button if there are actually more reviews to display'
  if (reviewDisplayCount < props.totalReviews && pullMoreReviews) {
    return (
      <div>
        <div className="sortAndCount">
          <span>{props.totalReviews + ' reviews, sorted by '}</span>
          <ReviewSortDropDown sortType={props.sortType}/>
        </div>
        <div className='reviewList'>{reviews}</div>
        <div>
          <button onClick={moreReviews} className="moreReviewsButton">More Reviews</button>
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
