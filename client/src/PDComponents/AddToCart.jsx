import axios from 'axios'
import React from 'react'

const AddToCartComponent = ({ sku, selectedSize, handleNoSkuClick }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault()
    axios.post('/api/cart', {
      sku_id: sku
    })
      .then(response => {
        document.querySelector('#add-to-cart').innerHTML = '✓'
        document.querySelector('#add-to-cart').setAttribute('disabled', true)
      })
      .catch(() => {
        document.querySelector('#add-to-cart').innerHTML = 'Try Again'
        document.querySelector('#add-to-cart').focus()
      })
  }

  return (
    <>
      {sku
        ? <>{selectedSize.quantity > 0 && <button id='add-to-cart' className='checkout-button' onClick={handleAddToCartClick}>Cart +</button>}</>

        : <button id='add-to-cart' className='checkout-button' onClick={handleNoSkuClick}>Cart +</button>}
    </>

  )
}

export default AddToCartComponent
