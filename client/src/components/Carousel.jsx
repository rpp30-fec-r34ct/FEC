import React from 'react';
import ProductCards from './ProductCards.jsx';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';


import css from './../styles.css';



export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          category: 'Shoes'
        },

        {
          id: 2,
          category: 'Jackets'
        },

        {
          id: 3,
          category: 'Accessories'
        },

        {
          id: 4,
          category: 'Pants'
        }
      ],
      currentIndex: 0
    }

    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }


  goPrev() {
    let index = this.state.currentIndex;
    if (index > 0) {
      index--;
      this.setState({
        currentIndex: index
      });
    }
  }


  goNext() {
    let index = this.state.currentIndex;
    let length = this.state.data.length;
    if (index < length - 1) {
      index++;
      this.setState({
        currentIndex: index
      });
    }
  }



  render() {
    return (
      <div className="carousel-container">
        <FaChevronLeft className="left-arrow" onClick={this.goPrev} />
        {
          this.state.data.map((item, index) => {
            return <div className={index === this.state.currentIndex ? 'show' : 'hide'}>
              <ProductCards key={item.id} item={item} />
            </div>
          })
        }
        <FaChevronRight className="right-arrow" onClick={this.goNext} />
      </div >
    )
  }
}