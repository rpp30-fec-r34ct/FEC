import React from 'react'
import SizeSelector from './SizeSelector.jsx'

const ProductCheckoutComponent = ({ selectedStyle }) => {
  return (
    <div>
      <SizeSelector selectedStyle={selectedStyle} />

      <select>
        <option value='1'>1</option>
      </select>

      <button>Add to bag    +</button>
      <button>Favorite</button>

    </div>
  )
}

export default ProductCheckoutComponent
