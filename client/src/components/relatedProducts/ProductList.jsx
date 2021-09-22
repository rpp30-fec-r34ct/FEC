import React from 'react'
import ProductCards from './ProductCards.jsx'

export default function ProductList(props) {
  return (
    <div className='product-list'>
      {
        props.relatedProducts.map((product, index) => {
          return <ProductCards
            key={index}
            product={product}
            toggleModal={props.toggleModal}
            getProductDetails={props.getProductDetails}
            resetState={props.resetState}
          />
        })
      }
    </div>
  );
}
