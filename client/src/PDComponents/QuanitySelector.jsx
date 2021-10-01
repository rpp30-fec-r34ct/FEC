import React from 'react'

const QuanitiySelectorComponent = ({ selectedSize }) => {
  const selections = []

  if (selectedSize) {
    for (let i = 1; i <= selectedSize.quantity && i <= 10; i++) {
      selections.push(<option key={i} value={i}>{i}</option>)
    }
  }

  const selectStyles = {
    height: '3em',
    width: '10em',
    borderRadius: 0,
    textAlign: 'center'
  }

  return (
    <>
      {selectedSize
        ? (
          <select id='quantity-select' style={selectStyles} defaultValue='1' disabled={false}>
            {selections}
          </select>
          )
        : (
          <select id='quantity-select' style={selectStyles} defaultValue='-' disabled>
            <option value='-' disabled>-</option>
          </select>
          )}
    </>
  )
}

export default QuanitiySelectorComponent
