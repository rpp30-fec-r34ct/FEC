import React, { useState } from 'react';
import Comparison from './Comparison.jsx';


export default function ProductCards(props) {
  return (
    <div className="product-card">
      <h5>Card</h5>
      <div className="card-container">
        <div className="name">{props.product.name}</div>
        <div className="category">{props.product.category}</div>
        <div className="price">${props.product.price}</div>
      </div>
    </div>
  )

}