import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductList({currentIndex, relatedProducts, currentOverview}) {
  return (
    <div className='product-list'>
      <div className='carousel-content-wrapper'>
        <div className='carousel-content' style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
          {
            relatedProducts.map((relatedProduct, index) => {
              return <ProductCard
                key={index}
                relatedProduct={relatedProduct}
                currentOverview={currentOverview}
              />
            })
          }
        </div>
      </div>
    </div>

  )
}
