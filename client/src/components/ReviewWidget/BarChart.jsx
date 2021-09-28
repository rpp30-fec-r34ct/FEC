import React from 'react';
import BarLine from './BarLine.jsx';

const BarChart = (props) => {
  let bars = [];
  let givenStars = Object.keys(props.breakDownRatings);

  for (var i = 5; i > 0; i--) {
    if (givenStars.indexOf(i.toString()) === -1) {
      bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={0} />)
    } else {
      bars.push(<BarLine key={i} star={i.toString()} numberOfReviews={props.breakDownRatings[i]} totalReviews={props.totalReviews}/>)
    }
  }


  return (
    <div data-testid="testBarChart" className="BarChart">{bars}</div>
  )
}

export default BarChart;