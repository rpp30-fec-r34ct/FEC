import React from 'react';

const ProductBreakDownBar = (props) => {
  //infile styling required to place thing over bars.

  const charBar = {
    height: 10 + 'px',
    background: 'lightgrey',
    width: 32.5  + '%',
  }
  const charPointer = {
    left: ((props.rating/5) * 100) + '%',
    color: 'green',
    position: 'absolute',
    bottom: '.9px'
  }

  const holderStyle = {
    position: 'relative',
  }

  return (
    <div style={holderStyle}>
      <div data-testid="testProductBreakdownBar" className="productBreakDownBar">
          <div className="breakDownRect" style={charBar}></div>
          <div className="breakDownRect" style={charBar}></div>
          <div className="breakDownRect" style={charBar}></div>
      </div>
      <i className="fas fa-caret-down" style={charPointer}></i>
    </div>
  )
}

export default ProductBreakDownBar;