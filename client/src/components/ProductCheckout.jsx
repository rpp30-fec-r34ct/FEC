import React from 'react'

const ProductCheckoutComponent = (props) => {
  return (
    <div>
      <select defaultValue='none'>
        <option value='none' disabled hidden>Select an Option</option>
      </select>

      <select>
        <option value='1'>1</option>
      </select>

      <button>Add to bag    +</button>
      <button>Favorite</button>

    </div>
  )
}

export default ProductCheckoutComponent
