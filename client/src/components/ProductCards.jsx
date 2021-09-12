import React, { useState } from 'react';
import Comparison from './Comparison.jsx';


export default function ProductCards(props) {
  return (
    <div className="product-cards">
      {props.product.name}{props.product.category}{props.product.price}
      <Comparison />
    </div>
  )

}