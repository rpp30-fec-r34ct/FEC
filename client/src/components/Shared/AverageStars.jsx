import React from 'react'
import helper from './helpers.js'
import FullStar from './../Review Widget/icons/star.svg'
import HalfStar from './../Review Widget/icons/star-half.svg'
import QuarterStar from './../Review Widget/icons/star-one-quarter.svg'
import ThreeQuarterStar from './../Review Widget/icons/star-three-quarter.svg'
import EmptyStar from './../Review Widget/icons/empty-star.svg'

const AverageStars = (props) => {
  const averageRating = helper.findStarRating(props.rating)

  const wholeRating = Math.floor(averageRating) || 0

  const wholeStars = Array.from(Array(wholeRating)).map((_, i) => (
    <img alt="full-Star" key={i} src={FullStar} data-testid='full-star-img' />
  ))

  const emptyStars = Array.from(Array(5)).map((_, i) => <img alt="empty-Star" key={i} src={EmptyStar} data-testid='empty-star-img' />)

  const remaining = Math.round(((averageRating - wholeRating) * 100) % 4) // remaining in quarters
  let remainingStar

  switch (remaining) {
    case 1:
      remainingStar = <img alt="quarter-star" src={QuarterStar} data-testid='quarter-star-img' />
      break
    case 2:
      remainingStar = <img alt="half-star" src={HalfStar} data-testid='half-star-img' />
      break
    case 3:
      remainingStar = <img alt="three-quarter-star" src={ThreeQuarterStar} data-testid='three-quarter-star-img' />
      break
    default:
      break
  }

  const ratingElement = (
    <>
      {
        averageRating
          ? (
            <>
              <div style={{ display: 'flex', position: 'absolute' }}>
                {emptyStars}
              </div>
              <div style={{ display: 'flex' }}>
                {wholeStars}
                {remainingStar}
              </div>
            </>
            )
          : null
      }
    </>
  )

  return (
    <div className='card-rating' style={{ visibility: !averageRating ? 'hidden' : '' }}>
      {ratingElement}
    </div>
  )
}

export default AverageStars
