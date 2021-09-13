import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MainImageGallery from './MainImageGallery.jsx';
import ProductDescription from './ProductDescription.jsx';

const ProductDetailPageComponent = (props) => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({})

  const getProductDetails = () => {
    axios.get(`/api/products/${productId}`)
    .then((data) => {
      setProductDetails(data.data)
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  }

  const getStyles = () => {
    axios.get(`/api/products/${productId}/styles`)
      .then(res => {
        setStyles(res.data.results);
        setSelectedStyle(res.data.results[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(()=> {
    getStyles();
  }, [productDetails])

  useEffect(() => {
    getProductDetails();
  },[])

  let productDetailStyles = {
    "display": "flex",
  }

  return (
    <div>
    <div style={productDetailStyles}>
      <MainImageGallery />
      <ProductDescription productDetails={productDetails} productId={productId} styles={styles} selectedStyle={selectedStyle}/>
    </div>
    {productDetails.description}
    </div>
  )
}

export default ProductDetailPageComponent;