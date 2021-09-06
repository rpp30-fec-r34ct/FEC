import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Carousel from './components/Carousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: 47421,
      productDetails: []
    }

    this.getProductDetails = this.getProductDetails.bind(this);
  }

  //use component did mount to trigger initial request for default product id data
  componentDidMount() {
    this.getProductDetails(this.state.productID);
  }

  getProductDetails(id) {
    axios.get(`http://localhost:3000/productDetail${id}`)
      .then((data) => {
        console.log('data received from server for product');
        this.setState({
          productID: data.data.id,
          productDetails: data.data
        })
      })
      .catch((err) => {
        console.error('error while getting product data from server');
      })
  }

  render() {
    return (
      <div>
        <h1>PROJECT ATLIER</h1>
        <h2>Product Name</h2>
        <div>{this.state.productDetails.name}</div>
        <h2>Product Description</h2>
        <div>{this.state.productDetails.description}</div>
        <Carousel />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));