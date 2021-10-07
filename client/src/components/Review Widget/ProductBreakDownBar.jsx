/* eslint-disable */
import React from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
const ProductBreakDownBar = (props) => {
  // infile styling required to place thing over bars.

  const charBar = {
    height: 10 + 'px',
    background: 'lightgrey',
    width: 32.5 + '%'
  }
  const charPointer = {
    left: ((props.rating / 5) * 100) + '%',
    color: 'green',
    position: 'absolute',
    bottom: '.9px'
  }

  const holderStyle = {
    position: 'relative'
  }

  return (
    <div style={holderStyle}>
      <div data-testid='testProductBreakdownBar' className='productBreakDownBar'>
        <div className='breakDownRect' style={charBar} />
        <div className='breakDownRect' style={charBar} />
        <div className='breakDownRect' style={charBar} />
      </div>
      <AiOutlineCaretDown style={charPointer} />
    </div>
  )
}

export default ProductBreakDownBar
