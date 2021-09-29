import React from 'react'
import helper from './helpers.js'
import FullStar from './../ReviewWidget/icons/star.svg'
import HalfStar from './../ReviewWidget/icons/star-half.svg'
import QuarterStar from './../ReviewWidget/icons/star-one-quarter.svg'
import ThreeQuarterStar from './../ReviewWidget/icons/star-three-quarter.svg'
import EmptyStar from './../ReviewWidget/icons/empty-star.svg'

const AverageStars = (props) => {
  const averageRating = helper.findStarRating(props.rating)
  // console.log('rating', typeof averageRating, 'value', averageRating)

  const fullStarsArray = Array
    .from(Array(Math.floor(averageRating)))
    .map((_, i) => <img key={i} src={FullStar} />)

  const emptyFullStarArray = Array
    .from(Array(5))
    .map((_, i) => <img key={i} src={EmptyStar} />)

  const ratingElement = (
    <>
      {
        averageRating ? (
          <>
            <div style={{ display: 'flex', position: 'relative' }} >
              {emptyFullStarArray}
            </div>
            <div style={{ display: 'flex' }}>
              {fullStarsArray}
              {averageRating - Math.floor(averageRating) === 0 ? (
                ""
              ) : (
                <img src={HalfStar} />
              )}
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