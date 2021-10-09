import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'

import MainImageGallery from './MainImageGallery.jsx'
import ProductDescription from './ProductDescription.jsx'
import ProductDetailFooter from './ProductDetailFooter.jsx'

const ProductDetailPageComponent = ({ theme }) => {
  const { productId } = useParams()
  const [productDetails, setProductDetails] = useState(false)
  const [styles, setStyles] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(false)
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
        setStyles(res.data.results)
        setSelectedStyle(res.data.results[0])
      })
      .catch(err => {
        setRedirect(err)
      })
  }

  const updateSelectedStyle = (index) => {
    setSelectedStyle(styles[index])
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const lightStyles = {
    display: 'flex',
    backgroundColor: 'rgb(236 236 236)',
    borderRadius: '10px',
    width: 'fit-content',
    padding: '15px'
  }

  const darkStyles = {
    display: 'flex',
    backgroundColor: 'rgb(44 44 45)',
    borderRadius: '10px',
    width: 'fit-content',
    padding: '15px'
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
      <div style={theme === 'light' ? lightStyles : darkStyles}>
        <MainImageGallery selectedStyle={selectedStyle} theme={theme}/>
        <ProductDescription
        productDetails={productDetails}
        productId={productId} styles={styles}
        selectedStyle={selectedStyle}
        updateSelectedStyle={updateSelectedStyle}
        theme={theme} />
      </div>
      <ProductDetailFooter productDetails={productDetails} theme={theme}/>
    </>
  )
}

export default ProductDetailPageComponent
