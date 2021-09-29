import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductList(props) {
  return (
    <div className='product-list'>
      <div className='carousel-content-wrapper'>
        <div className='carousel-content' style={{ transform: `translateX(${props.currentIndex * 15}%)` }}>
          {
            props.relatedProducts.map((product, index) => {
              return <ProductCard
                key={index}
                product={product}
                currentProduct={props.currentProduct}
              />
            })
          }
        </div>
      </div>
    </div>

  )
}
