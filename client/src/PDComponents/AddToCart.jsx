import axios from 'axios'
import React from 'react'

const AddToCartComponent = ({ sku, handleNoSkuClick }) => {

  const handleAddToCartClick = (e) => {
    e.preventDefault()
    axios.post('/addtocart', {
      product_id: sku
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err))
  }

  return(
    <>
    {sku
    ? <button onClick={handleAddToCartClick}> Add to cart +</button>
    : <button onClick={handleNoSkuClick}> Add to cart +</button>
    }
    </>

  )
}