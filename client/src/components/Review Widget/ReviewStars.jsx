import React from 'react'
import quarterStar from './icons/star-one-quarter.svg'
import fullStar from './icons/star.svg'
import halfStar from './icons/star-half.svg'
import threeQuarterStar from './icons/star-three-quarter.svg'
import emptyStar from './icons/empty-star.svg'

const ReviewStars = (props) => {
  let wholeStars = [...Array(Math.floor(props.starRating))]
  let decimalStars = []
  let starArray
  const decimalRating = props.starRating % 1

  for (let i = 0; i < wholeStars.length; i++) {
    wholeStars[i] = <img src={fullStar} />
  }

  if (decimalRating > 0 && decimalRating <= 0.3) {
    decimalStars.push(<img src={quarterStar} />)
  } else if (decimalRating > 0.3 && decimalRating <= 0.6) {
    decimalStars.push(<img src={halfStar} />)
  } else if (decimalRating > 0.6 && decimalRating <= 0.9) {
    decimalStars.push(<img src={threeQuarterStar} />)
  }

  starArray = wholeStars.concat(decimalStars)
  if (starArray.length < 5) {
    for (var i = starArray.length; i < 5; i++) {
      starArray.push(<img src={emptyStar} />)
    }
  }


  return (
    <div>{starArray}</div>
  )
}

export default ReviewStars
