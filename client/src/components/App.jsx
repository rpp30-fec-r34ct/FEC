import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage.jsx';

const App = (props) => {

  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
<<<<<<< HEAD
        <Route path="/product/:id" component={ProductDetailPage} />
=======
        <Route path="/product/:productId">
          <ProductDetailPage />
        </Route>
>>>>>>> 466f7d028b01146b5b18c604b168616ee13376e8
      </Switch>
    </Router>
  )
}

export default App;