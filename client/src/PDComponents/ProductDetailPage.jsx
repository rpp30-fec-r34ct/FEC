import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'

import MainImageGallery from './MainImageGallery.jsx'
import ProductDescription from './ProductDescription.jsx'
import ProductDetailFooter from './ProductDetailFooter.jsx'

const ProductDetailPageComponent = (props) => {
  const { productId } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [productStyles, setProductStyles] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const getProductDetails = () => {
    axios.get(`/api/products/${productId}`)
      .then((data) => {
        setProductDetails(data.data)
        getStyles()
      })
      .catch((err) => {
        setRedirect(err)
      })
  }

  const getStyles = () => {
    axios.get(`/api/products/${productId}/styles`)
      .then(res => {
        setProductStyles(res.data.results)
        setSelectedStyle(res.data.results[0])
      })
      .catch(err => {
        setRedirect(err)
      })
  }

  const updateSelectedStyle = (index) => {
    setSelectedStyle(productStyles[index])
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const productDetailStyles = {
    display: 'flex'
  }

  return (
    <>
      {redirect
        ? <Redirect to={{
          pathname: '/404',
          state: { errorMsg: redirect }
        }}
          />
        : null}
      <div style={productDetailStyles}>
        <MainImageGallery selectedStyle={selectedStyle} />
        <ProductDescription productDetails={productDetails} productId={productId} productStyles={productStyles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
      </div>
      {productDetails ? <ProductDetailFooter productDetails={productDetails} /> : <div />}
    </>
  )
}

export default ProductDetailPageComponent
