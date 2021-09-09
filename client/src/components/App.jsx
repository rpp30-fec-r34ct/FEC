import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage.jsx';

const App = (props) => {

  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path="/product/:id" component={ProductDetailPage} />
      </Switch>
    </Router>
  )
}

export default App;