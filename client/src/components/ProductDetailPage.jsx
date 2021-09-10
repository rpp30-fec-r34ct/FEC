import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetailPageComponent = (props) => {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    getProductDetails();
  }, [])

  let getProductDetails = () => {
<<<<<<< HEAD
    axios.get(`http://localhost:3000/productDetail${props.match.params.id}`)
      .then((data) => {
        console.log('data received from server for product');
        setProductDetails(data.data)
      })
      .catch((err) => {
        console.error('error while getting product data from server');
      })
=======
    axios.get(`/productDetail${productId}`)
    .then((data) => {
      console.log('data received from server for product');
      setProductDetails(data.data)
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
>>>>>>> 466f7d028b01146b5b18c604b168616ee13376e8
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