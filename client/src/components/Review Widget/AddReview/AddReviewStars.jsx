import React,  { useState, useEffect} from 'react';
import emptyStar from '../icons/empty-star.svg'
import fullStar from '../icons/star.svg'

const AddReviewStars = () => {
  const [starState, setStarState] = useState([0,0,0,0,0]);


  const onAddReviewClick = (event) => {
    // console.log(event);
    let newStarState = [0,0,0,0,0]
    for (let j = 0; j < newStarState.length; j++) {
      if (j <= parseInt(event.target.id)) {
        newStarState[j] = 1;
      } else {
        newStarState[j] = 0;
      }
    }

    setStarState(newStarState)
  }

  useEffect(() => {
    renderStars()
  }, [starState])

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < starState.length; i++) {
      if (starState[i] === 0) {
        stars.push(<img id={i} onClick={onAddReviewClick} key={i} src={emptyStar} />)
      } else {
        stars.push(<img id={i} key={i} onClick={onAddReviewClick} src={fullStar} />)
      }
    }
    return stars;
  }

  const getOverviewStarRating = () => {
    return starState;
  }

  const getRatingTitle = () => {
    let starSum = 0;

    for (let i = 0; i < starState.length; i++) {
      if (starState[i]) {
        ++starSum;
      }
    }

    switch (starSum) {
      case (1):
        return 'Poor';
      case(2):
        return 'Fair';
      case(3):
        return 'Average';
      case(4):
        return 'Good';
      case(5):
        return 'Great';
      default:
        return '';
    }
  }

  return (
    <div style={{marginLeft: '20px'}}>
      {renderStars()}
      <span id="addReviewStarsOutput" style={{marginLeft: '10px', color: 'grey', opacity: '0.8'}}>{getRatingTitle()}</span>
    </div>
  )
}

export default AddReviewStars
