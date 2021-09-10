import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MainImageGallery from './MainImageGallery.jsx';
import ProductDescription from './ProductDescription.jsx';

const ProductDetailPageComponent = (props) => {
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    getProductDetails();
  },[])

  let getProductDetails = () => {
    axios.get(`/productDetail${props.match.params.id}`)
    .then((data) => {
      console.log('data received from server for product');
      setProductDetails(data.data)
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  }

  let styles = {
    "display": "flex",

  }

  return (
    <div>
    <div style={styles}>
      <MainImageGallery />
      <ProductDescription productDetails={productDetails}/>
    </div>
    {productDetails.description}
    </div>
  )
}

export default ProductDetailPageComponent;