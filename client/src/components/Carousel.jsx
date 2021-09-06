import React from 'react';
import ProductCards from './ProductCards.jsx';
import axios from 'axios';


export default class Carousel extends React.Component {


  render() {
    return (
      <div className="carousel">
        <h2>Carousel</h2>
        <ProductCards />
      </div>
    )
  }
}