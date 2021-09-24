import React from 'react'

const QuanitiySelectorComponent = ({ selectedSize }) => {
  const selections = []

  if (selectedSize) {
    for (let i = 1; i <= selectedSize.quantity && i <= 10; i++) {
      selections.push(<option value={i}>{i}</option>)
    }
  }

  return (
    <>
      {selectedSize
        ? (
          <select defaultValue='1' disabled={false}>
            {selections}
          </select>
          )
        : (
          <select defaultValue='-' disabled>
            <option value='-' disabled>-</option>
          </select>
          )}
    </>
  )
}

export default QuanitiySelectorComponent
