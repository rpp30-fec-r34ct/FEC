import React from 'react';
import './cssFiles/barChart.css';


const BarLine = (props) => {
  const emptyBarWidth = 197;
  const leftPos = 53;

  const BarLine = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Playfair Display, serif',
    fontSize: '0.9em',
    position: 'relative'
  }

  const categoryCountStyle = {
    position: 'relative',
    left: '100%'
  }

  const styleFullBar = {
    width: ((props.numberOfReviews/props.totalReviews) * 75) + '%',
    left: leftPos + 'px',
    height: 5 + 'px',
    background: 'green',
    position: 'absolute'
  }

  const styleEmptyBar = {
    left: leftPos + 'px',
    width: '75%',
    height: 5 + 'px',
    background: 'lightgrey',
    position: 'absolute'
  }

  return (
    <div data-testid="testBarLine" className="BarLine" style={BarLine} >
      <span onClick={props.handleFilterToggle} className="ratingName">{props.star + ' stars'}</span>
      <div className="emptyBar" style={styleEmptyBar}></div>
      <div className="fullBar" style={styleFullBar}></div>
      <span className="categoryCount" style={categoryCountStyle}>{' (' + props.numberOfReviews + ')'}</span>
    </div>
  )
}

export default BarLine