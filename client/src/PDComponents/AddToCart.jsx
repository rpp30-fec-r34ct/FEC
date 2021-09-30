import axios from 'axios'
import React from 'react'

const AddToCartComponent = ({ sku, selectedSize, handleNoSkuClick }) => {
  const handleAddToCartClick = (e) => {
    e.preventDefault()
    console.log('click')
    axios.post('/api/cart', {
      sku_id: sku
    })
      .then(response => {
        console.log('cart api ', response.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {sku
        ? <>{selectedSize.quantity > 0 && <button className='checkout-button' onClick={handleAddToCartClick}>Cart +</button>}</>

        : <button className='checkout-button' onClick={handleNoSkuClick}>Cart +</button>}
    </>

  )
}

export default AddToCartComponent
