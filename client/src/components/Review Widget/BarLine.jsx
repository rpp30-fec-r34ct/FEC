import React from 'react';
import './cssFiles/barChart.css';


const BarLine = (props) => {
  const emptyBarWidth = 212;
  const leftPos = 53;

  const styleFullBar = {
    width: (props.numberOfReviews/props.totalReviews * emptyBarWidth) + 'px',
    left: leftPos + 'px',
    height: 5 + 'px',
    background: 'green',
    position: 'absolute'
  }

  const styleEmptyBar = {
    left: leftPos + 'px',
    width: emptyBarWidth + 'px',
    height: 5 + 'px',
    background: 'lightgrey',
    position: 'absolute'

  }

  return (
    <div className="BarLine" >
      <span className="ratingCategory">{props.star + ' stars'}</span>
      <div className="emptyBar" style={styleEmptyBar}></div>
      <div className="fullBar" style={styleFullBar}></div>
      <span className="ratingCategoryCount">{'(' + props.numberOfReviews + ')'}</span>
    </div>
  )
}

export default BarLine