import React from 'react'
import helper from '../helpers.js'
import Star from './Review Widget/icons/star.svg'

const AverageStars = (props) => {
  const averageRating = helper.findStarRating(props.rating)
  console.log('rating', averageRating)
  console.log('rating', props.rating)


  const ratingElement = (
    <>
      {averageRating && typeof averageRating === 'number' ? (
        <>
          <h2>{averageRating}</h2>
          <span>
            {Array(Math.floor(averageRating)).fill(<i className='fa fa-star' />)}
            {averageRating - Math.floor(averageRating) === 0 ? (
              ""
            ) : (
              <i className='fa fa-star' />
            )}
          </span>
        </>
      ) : null}
    </>
  );

  return (
    <div className='card-rating' style={{ visibility: isNaN(averageRating) && "hidden" }}>
      {averageRating}
      {ratingElement}
    </div>
  )

}

export default AverageStars;