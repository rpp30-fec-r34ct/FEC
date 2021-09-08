import React, { useState, useEffect } from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

// const fetchURL = 'https://jsonplaceholder.typicode.com'


import css from './../styles.css';



export default function Carousel(props) {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(
    [{ 'name': 'Apple' }, { 'name': 'Grass' }, { 'name': 'Juice' }, { 'name': 'Bird' }]); //length 2
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = products.length;

  // const getProducts = () =>
  //   fetch(`${fetchURL}/posts`)
  //     .then((res) => res.json())

  // useEffect(() => {
  //   getProducts().then((data) => setData(data))
  // }, [])

  const hideArrow = {
    display: 'none'
  }


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
    <div className="carousel-container">
      {currentIndex > 0 && <FaChevronLeft className="left-arrow" onClick={prevCard} />}
      <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        {/* {products?.map((item) =>
          <div key={item.id}>{item.name}</div>
        )}
      </div> */}
      </div>
      {currentIndex < (length - 1) && <FaChevronRight className="right-arrow" onClick={nextCard} />}
    </div>
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