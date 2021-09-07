import React from 'react';
import Comparison from './Comparison.jsx';


export default class ProductCards extends React.Component {


  render() {
    return (
      <div className="product-cards">
        {this.props.item.category}
        {/* <Comparison /> */}
      </div>
    )
  }
}