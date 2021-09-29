import React from 'react'
import helper from './helpers.js'
import FullStar from './../Review Widget/icons/star.svg'
import HalfStar from './../Review Widget/icons/star-half.svg'
import QuarterStar from './../Review Widget/icons/star-one-quarter.svg'
import ThreeQuarterStar from './../Review Widget/icons/star-three-quarter.svg'
import EmptyStar from './../Review Widget/icons/empty-star.svg'

const AverageStars = (props) => {
  const averageRating = helper.findStarRating(props.rating);

  let wholeRating = Math.floor(averageRating) || 0;

  let wholeStars = Array.from(Array(wholeRating)).map((_, i) => (
    <img key={i} src={FullStar} />
  ));

  let emptyStars = Array.from(Array(5)).map((_, i) => <img key={i} src={EmptyStar} />);

  let remaining = Math.round(((averageRating - wholeRating) * 100) % 4); //remaining in quarters
  let remainingStar;

  switch (remaining) {
    case 1:
      remainingStar = <img src={QuarterStar} />
      break;
    case 2:
      remainingStar = <img src={HalfStar} />
      break;
    case 3:
      remainingStar = <img src={ThreeQuarterStar} />
      break;
    default:
      break;
  }

  const ratingElement = (
    <>
      {
        averageRating ? (
          <>
            <div style={{ display: 'flex', position: 'absolute' }} >
              {emptyStars}
            </div>
            <div style={{ display: 'flex' }}>
              {wholeStars}
              {remainingStar}
            </div>
          </>
        ) : null
      }
    </>
  );



  return (
    <div className='card-rating' style={{ visibility: !averageRating ? "hidden" : "" }}>
      {ratingElement}
    </div>
  )
}

export default AverageStars;