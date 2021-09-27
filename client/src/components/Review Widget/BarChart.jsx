import React from 'react';
import BarLine from './BarLine.jsx';

const BarChart = (props) => {
  let bars = [];

  if (props.breakDownRatings === null) {
    for (var i = 5; i > 0; i--) {
      bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={0} />)
    }
  } else {
    let givenStars = Object.keys(props.breakDownRatings);

    for (var i = 5; i > 0; i--) {
      if (givenStars.indexOf(i.toString()) === -1) {
        bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={0} handleFilterToggle={props.handleFilterToggle}/>)
      } else {
        bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={props.breakDownRatings[i]} totalReviews={props.totalReviews} handleFilterToggle={props.handleFilterToggle}/>)
      }
    }
  }

  return (
    <div data-testid="testBarChart" className="BarChart">{bars}</div>
  )
}

export default BarChart;