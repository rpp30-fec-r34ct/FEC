import React from 'react'
import SizeSelectorItemComponent from './SizeSelectorItem.jsx'

const SizeSelectorComponent = ({ selectedStyle, updateSelectedSize }) => {
  const skus = []
  if (selectedStyle) {
    for (const size in selectedStyle.skus) {
      skus.push(<SizeSelectorItemComponent item={selectedStyle.skus[size]} name={size} />)
    }
  }

  return (
    <>
      {selectedStyle
        ? (
          <select onChange={updateSelectedSize} defaultValue='0'>
            <option value='0' disabled>Select Size</option>
            {skus}
          </select>
          )

        : (
          <select disabled defaultValue='OUT OF STOCK'>
            <option value='OUT OF STOCK' disabled='disabled'>OUT OF STOCK</option>
          </select>
          )}
    </>
  )
}

export default SizeSelectorComponent
