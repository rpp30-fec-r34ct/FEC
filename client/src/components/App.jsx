import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage.jsx';
import ReviewSection from './ReviewSection.jsx';

const App = (props) => {

  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path="/product/:productId">
          <ProductDetailPage />
        </Route>
        <Route path="/reviews">
          <ReviewSection />
        </Route>
        <Route path="/">
          <h1>Homepage</h1>
          <ReviewSection product_id={47421}/>
        </Route>
      </Switch>
     </Router>
  )
}

export default App;