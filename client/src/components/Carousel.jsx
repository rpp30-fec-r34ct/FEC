import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './../styles.css';


export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = relatedProducts.length;
  const { productId } = useParams();

  useEffect(() => {
    getRelatedProducts();
  }, [])

  let getRelatedProducts = () => {
    axios.get(`/products/${productId}/related`)
      .then((data) => {
        console.log('data received from server for product');
        setRelatedProducts(data.data)
      })
      .catch((err) => {
        console.error('error while getting product data from server');
      })
  }


  const nextCard = () => {
    if (currentIndex >= 0 && currentIndex < (length - 1)) {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }
  }


  const prevCard = () => {
    if (currentIndex > 0 && currentIndex <= (length - 1)) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    }
  }


  return (
    <div className="carousel-container">
      {currentIndex > 0 && <FaChevronLeft className="left-arrow" onClick={prevCard} />}
      <div className="carousel-content-wrapper">
        <h2>RELATED PRODUCTS</h2>
        <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 80}%)` }}>
          {
            relatedProducts.map((product) => {
              return <ProductList key={product.id} product={product} />
            })
          }
        </div>
      </div>
      {currentIndex < (length - 1) && <FaChevronRight className="right-arrow" onClick={nextCard} />}

    </div>
  )

}
