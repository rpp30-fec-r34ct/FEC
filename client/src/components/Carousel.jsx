import React, { useState, useEffect } from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';


import css from './../styles.css';



export default function Carousel(props) {

  const [products, setProducts] = useState(
    [{ 'name': 'Apple' }, { 'name': 'Grass' }, { 'name': 'Juice' }, { 'name': 'Bird' }]); //length 2
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = products.length;



  const nextCard = () => {
    if (currentIndex >= 0 && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }
  }


  const prevCard = () => {
    if (currentIndex > 0 && currentIndex <= products.length - 1) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    }
  }


  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <ProductList />
      </div>
      <div className="carousel-controls">
        <FaChevronLeft className="left-arrow" onClick={prevCard} />
        <FaChevronRight className="right-arrow" onClick={nextCard} />
      </div>
    </div >
  )

}
{/* <FaChevronLeft className="left-arrow" onClick={() => setCurrentIndex(currentIndex - 1)} />
<div className="carousel-container"
{...products.map((item, index) => {
  return <div className={index === state.currentIndex ? 'show' : 'hide'}>
    <ProductCards key={item.id} item={item} />
})
  </div>
}
</div>
<FaChevronRight className="right-arrow" onClick={() => setCurrentIndex(currentIndex + 1)} /> */}