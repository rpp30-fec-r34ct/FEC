import React from 'react'
import ProductCards from './ProductCards.jsx'

export default function ProductList(props) {
  return (
    <div className='product-list'>
      <div className='carousel-content-wrapper'>
        <div className='carousel-content' style={{ transform: `translateX(${props.currentIndex * 2}%)` }}>
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
      </div>
    </div>
  );
}
