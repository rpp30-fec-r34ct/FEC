import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage.jsx';

class App extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <Router>
        <h1>PROJECT ATLIER</h1>
        <Switch>
        <Route path="/product/:id" component={ProductDetailPage}/>
        </Switch>
      </Router>
    )
  }
}

export default App;