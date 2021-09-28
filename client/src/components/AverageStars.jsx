import React from 'react'
import helper from '../helpers.js'
import { ReactComponent as FullStar } from './ReviewWidget/icons/star.svg'
import { ReactComponent as HalfStar } from './ReviewWidget/icons/star-half.svg'
import { ReactComponent as QuarterStar } from './ReviewWidget/icons/star-one-quarter.svg'
import { ReactComponent as ThreeQuarterStar } from './ReviewWidget/icons/star-three-quarter.svg'
import { ReactComponent as EmptyStar } from './ReviewWidget/icons/empty-star.svg'

const AverageStars = (props) => {
  const averageRating = helper.findStarRating(props.rating)
  console.log('rating', averageRating)
  console.log('rating', props.rating)


  // const ratingElement = (
  //   <>
  //     {averageRating && typeof averageRating === 'number' ? (
  //       <>
  //         <h2>{averageRating}</h2>
  //         <div style={{ display: 'flex' }}>
  //           {Array(Math.floor(averageRating)).fill(<FullStar />)}
  //           {averageRating - Math.floor(averageRating) === 0 ? (
  //             ""
  //           ) : (
  //             <HalfStar />
  //           )}
  //         </div>
  //       </>
  //     ) : null}
  //   </>
  // );

  return (
    <div className='card-rating' style={{ visibility: isNaN(averageRating) && "hidden" }}>
      {averageRating}
      <>
        {averageRating && typeof averageRating === 'number' ? (
          <>
            <h2>{averageRating}</h2>
            <div style={{ display: 'flex' }}>
              {Array(Math.floor(averageRating)).fill(<FullStar />)}
              {averageRating - Math.floor(averageRating) === 0 ? (
                ""
              ) : (
                <HalfStar />
              )}
            </div>
          </>
        ) : null}
      </>
    </div>
  )
}

export default AverageStars;