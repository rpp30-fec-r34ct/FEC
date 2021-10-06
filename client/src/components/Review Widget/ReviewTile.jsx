import './cssFiles/reviewTile.css'
import ReviewStars from './ReviewStars.jsx'
import React, { useState, useEffect } from 'react'
import PhotoThumbnailRow from './PhotoThumbnailRow.jsx'
import axios from 'axios';
import useLocalStorage from '../Shared/useLocalStorage.jsx'

const ReviewTile = (props) => {
  const [helpfulCount, setHelpfulCount] = useState(0)
  const [reportedState, setReportedState] = useState(0);
  const [isMarkedReported, setIsMarkedReported] = useState(0)
  const [helpfulList, setHelpfulList] = useLocalStorage('helpfulReviews',[])
  //having the reported reviews in localstorage is a backfall. Technically the reported reviews should be taken out of the REVIEWS
  //sent from the API to us once we report them, but just in case the user does a refresh before the Atlier backend can take care
  //of it, we have it saved inlocal storage.
  const [reportedList, setReportedList] = useLocalStorage('reportedReviews',[])


  const onHelpfulClick = (event) => {
    let newHelpfulList = [...helpfulList];
    console.log(event);

    if (newHelpfulList.indexOf(event.target.id) === -1) {
      newHelpfulList.push(event.target.id)
      setHelpfulCount(helpfulCount + 1);
      sendHelpfulReviewToServer(event.target.id);
      setHelpfulList(newHelpfulList);
    } else {
      console.log('already marked as helpful');
    }
  }

  const onReportedClick = (event) => {
    let newReportedList = [...reportedList];
    if (newReportedList.indexOf(event.target.id) === -1) {
      newReportedList.push(event.target.id);
      setReportedState(1);
      sendReportedReviewToServer(event.target.id);
      setReportedList(newReportedList);
    } else {
      console.log('already marked as reported');
    }
  }

  useEffect (() => {
    setHelpfulCount(props.reviewData.helpfulness);
  },[props.reviewData.helpfulness])

  const sendHelpfulReviewToServer = (id) => {
    axios.put('/reviewHelpful', {
      params: {
        review_id: id
      }
    })
    .then ((data) => {
      console.log('succssfully sent helpful post to server ');
    })
    .catch ((err) => {
      console.log('errored out while sending helpful post');
    });
  }

  const sendReportedReviewToServer = (id) => {
    axios.put('/reviewReport', {
      params: {
        review_id: id
      }
    })
    .then ((data) => {
      console.log('succssfully sent reported post to server ');
    })
    .catch ((err) => {
      console.log('errored out while sending reported post');
    });
  }


  const translateDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = props.reviewData.date.slice(8, 10)
    const year = props.reviewData.date.slice(0, 4)
    const month = months[parseInt(props.reviewData.date.slice(5, 7)) - 1]
    const returnDate = month + ' ' + day + ', ' + year

    return returnDate
  }

  const getIsRecommended = (recommended) => {
    if (recommended) {
      return (
        <div className='tile_recommend'>
          <i className='fas fa-check' style={{ color: 'green' }} />
          <span> I recommend this product</span>
        </div>
      )
    }
  }

  const getResponse = (response) => {
    if (response !== null && response !== '') {
      return <div className='tile_response'>Response: {response}</div>
    }
  }

  const getPhotos = (photos) => {
    if (photos.length !== 0) {
      return <PhotoThumbnailRow photos={props.reviewData.photos} onPhotoClick={props.onPhotoClick} />
    }
  }

  const getReportRender = () => {
    if (reportedState) {
      return <span onClick={onReportedClick} id={props.reviewData.review_id} className='tile_report'>{' | ' + 'Reported'}</span>
    } else {
      return <span onClick={onReportedClick} id={props.reviewData.review_id} className='tile_report'>{' | ' + 'Report'}</span>
    }
  }

  return (
    <div className='reviewTile'>
      <div className='tile_user_date_rating'>
        <ReviewStars starRating={props.reviewData.rating} review_id={props.reviewData.review_id} />
        <div className='tile_user_date'>
          <span className='tile_userName'>{props.reviewData.reviewer_name}</span>
          <span data-testid='testReviewTileDate' className='tile_date'>{translateDate()}</span>
        </div>
      </div>
      <div className='tile_summary'>{props.reviewData.summary}</div>
      <div className='tile_body'>{props.reviewData.body}</div>
      {getPhotos(props.reviewData.photos)}
      {getIsRecommended(props.reviewData.recommend)}
      {getResponse(props.reviewData.response)}
      <div className='tile_helpfulSection'>
        <span>Helfpul?</span>
        <span className='tile_helpfulVote' id={props.reviewData.review_id} onClick={onHelpfulClick}>Yes</span>
        <span className='tile_helpfulCount'>{'(' + helpfulCount + ')'}</span>
        {getReportRender()}
      </div>
    </div>
  )
}

export default ReviewTile
