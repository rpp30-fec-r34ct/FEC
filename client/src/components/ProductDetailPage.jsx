import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MainImageGallery from './MainImageGallery.jsx';
import ProductDescription from './ProductDescription.jsx';

const ProductDetailPageComponent = (props) => {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams();


  useEffect(() => {
    getProductDetails();
  },[])

  let getProductDetails = () => {
    axios.get(`/productDetail${productId}`)
    .then((data) => {
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
      <ProductDescription productDetails={productDetails} productId={props.match.params.id}/>
    </div>
    {productDetails.description}
    </div>
  )
}

export default ProductDetailPageComponent;