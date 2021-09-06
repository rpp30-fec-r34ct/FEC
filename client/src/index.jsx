import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      productID: 18923
    }
  }

  //use component did mount to trigger initial request for default product id data
  componentDidMount () {

  }

  render () {
    return (
      <div>HELLO!</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));