import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MainImageGallery from './MainImageGallery.jsx';
import ProductDescription from './ProductDescription.jsx';
import ProductDetailFooter from './ProductDetailFooter.jsx';

const ProductDetailPageComponent = (props) => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(false);
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(false)

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

  const updateSelectedStyle = (index) => {
    setSelectedStyle(styles[index]);
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
      <MainImageGallery selectedStyle={selectedStyle}/>
      <ProductDescription productDetails={productDetails} productId={productId} styles={styles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle}/>
    </div>
    {productDetails ? <ProductDetailFooter productDetails={productDetails}/> : <div></div>}
    </div>
  )
}

export default ProductDetailPageComponent;