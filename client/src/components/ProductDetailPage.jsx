import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductDetailPageComponent = (props) => {
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    getProductDetails();
  },[])

  let getProductDetails = () => {
    axios.get(`http://localhost:3000/productDetail${props.match.params.id}`)
    .then((data) => {
      console.log('data received from server for product');
      setProductDetails(data.data)
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  }

  return (
      <div>
        <h2>Product Name</h2>
        <div>{productDetails.name}</div>
        <h2>Product Description</h2>
        <div>{productDetails.description}</div>
      </div>
    )
}

export default ProductDetailPageComponent;