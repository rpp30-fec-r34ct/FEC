import React from 'react';

const ProductBreakDownBar = (props) => {
  //infile styling required to place thing over bars.

  const charBar = {
    height: 10 + 'px',
    background: 'lightgrey',
    width: 32.5  + '%',
  }
  const charRating = {
    height: 10 + 'px',
    width: 3 + 'px',
    left: ((props.rating/5) * 257) + 'px',
    position: 'absolute',
    background: 'green',
  }

  return (
    <>
      <div className="productBreakDownBar">
        <div className="breakDownRect" style={charBar}></div>
        <div className="breakDownRect" style={charBar}></div>
        <div className="breakDownRect" style={charBar}></div>
        <div style={charRating}></div>
      </div>
    </>
  )
}

export default ProductBreakDownBar;