import React, { useState, useEffect } from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import css from './../styles.css';


export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = products.length;

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
    <div className="carousel-container" style={{
      maxWidth: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: 50
    }} show={3}>
      <div className="carousel-wrapper">
        {currentIndex > 0 && <FaChevronLeft className="left-arrow" onClick={prevCard} />}
        <div className="carousel-content-wrapper">
          <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 80}%)` }}>

            {/* {products?.map((item) =>
          <div key={item.id}>{item.name}</div>
          )}
        </div> */}
          </div>
        </div>
        {currentIndex < (length - 1) && <FaChevronRight className="right-arrow" onClick={nextCard} />}
      </div>
    </div>
  )

}
