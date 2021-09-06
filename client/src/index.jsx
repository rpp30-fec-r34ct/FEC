import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      productID: 47421
    }
  }

  //use component did mount to trigger initial request for default product id data
  componentDidMount () {
    this.getProductId(this.state.productID);
  }

  getProductDetails (id) {
    axios.get(`http://localhost:3000/productDetail${id}`)
    .then((data) => {
      console.log('data received from server for product');
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  }

  render () {
    return (
      <div>HELLO!</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));