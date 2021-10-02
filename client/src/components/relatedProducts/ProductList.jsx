import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductList(props) {
  return (
    <div className='product-list'>
      <div className='carousel-content-wrapper'>
        <div className='carousel-content' style={{ transform: `translateX(-${props.currentIndex * 26}%)` }}>
          {
            props.relatedProducts.map((product, index) => {
              return <ProductCard
                key={index}
                product={product}
                currentProduct={props.currentProduct}
                currentPosition={props.currentPosition}
              />
            })
          }
        </div>
      </div>
    </div>

  )
}
