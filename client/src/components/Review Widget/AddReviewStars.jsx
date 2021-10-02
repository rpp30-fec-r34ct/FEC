import React,  { useState, useEffect} from 'react';
import emptyStar from './icons/empty-star.svg'
import fullStar from './icons/star.svg'

const AddReviewStars = () => {
  const [starState, setStarState] = useState([0,0,0,0,0]);


  const onAddReviewClick = (event) => {
    // console.log(event);
    let newStarState = [...starState];
    for (let j = 0; j <= parseInt(event.target.id); j++) {
      newStarState[j] = 1;
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
        stars.push(<img key={i} src={fullStar} />)
      }
    }
    return stars;
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
    <div>
      {renderStars()}
      <span>{getRatingTitle()}</span>
    </div>
  )
}

export default AddReviewStars