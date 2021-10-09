import React from 'react'
import ProductCard from './ProductCard.jsx'

export default function ProductList ({ currentIndex, relatedProducts, currentOverview }) {
  return (
    <div className='product-list'>
      <div className='carousel-content-wrapper'>
        <div className='carousel-content' style={{ transform: `translateX(-${currentIndex * 27}%)` }}>
          {
            relatedProducts.map((relatedItem, index) => {
              return (
                <ProductCard
                  key={index}
                  relatedItem={relatedItem}
                  currentOverview={currentOverview}
                />
              )
            })
          }
        </div>
      </div>
    </div>

  )
}
