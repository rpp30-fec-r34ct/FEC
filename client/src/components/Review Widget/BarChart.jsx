/* eslint-disable */
import React from 'react'
import BarLine from './BarLine.jsx'

const BarChart = (props) => {
  const bars = []

  if (props.breakDownRatings === null) {
    for (let i = 5; i > 0; i--) {
      bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={0} />)
    }
  } else {
    const givenStars = Object.keys(props.breakDownRatings)

    for (let i = 5; i > 0; i--) {
      if (givenStars.indexOf(i.toString()) === -1) {
        bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={0} onHandleFilterToggle={props.onHandleFilterToggle} />)
      } else {
        bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={props.breakDownRatings[i]} totalReviews={props.totalReviews} onHandleFilterToggle={props.onHandleFilterToggle} />)
      }
    }
  }

  return (
    <div data-testid='testBarChart' className='BarChart'>{bars}</div>
  )
}

export default BarChart
