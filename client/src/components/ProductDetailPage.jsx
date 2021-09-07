import React from 'react';
import axios from 'axios';

class ProductDetailPageComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productID: this.props.match.params.id,
      productDetails: []
    }

    this.getProductDetails = this.getProductDetails.bind(this);
  }

    //use component did mount to trigger initial request for default product id data
    componentDidMount () {
      this.getProductDetails(this.state.productID);
    }

    getProductDetails (id) {
      axios.get(`http://localhost:3000/productDetail${id}`)
      .then((data) => {
        console.log('data received from server for product');
        this.setState({
          productID: data.data.id,
          productDetails: data.data
        })
      })
      .catch ((err) => {
        console.error ('error while getting product data from server');
      })
    }

  render() {
    return (
      <div>
        <h2>Product Name</h2>
        <div>{this.state.productDetails.name}</div>
        <h2>Product Description</h2>
        <div>{this.state.productDetails.description}</div>
      </div>
    )
  }
}

export default ProductDetailPageComponent;