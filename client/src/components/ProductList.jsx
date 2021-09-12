import React from 'react';
import ProductCards from './ProductCards.jsx';


export default function ProductList(props) {
  return (
    <div className="product-list">
      <ProductCards product={props.product} />
    </div>
  )


}