import React from 'react'

const SizeSelectorComponent = ({ selectedStyle }) => {
  return (
    <>
      {selectedStyle
        ? (
          <select disabled>
            <option value='OUT OF STOCK' disabled='disabled' default='true'>OUT OF STOCK</option>
          </select>
          )
        : (
          <select disabled defaultValue='OUT OF STOCK'>
            <option value='OUT OF STOCK' disabled='disabled' default='true'>OUT OF STOCK</option>
          </select>
          )}
    </>
  )
}

export default SizeSelectorComponent
