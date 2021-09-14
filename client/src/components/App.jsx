import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductDetailPage from './ProductDetailPage.jsx'
import FourOhFour from './FourOhFour.jsx'
import Carousel from './Carousel.jsx';

const App = (props) => {
  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path="/product/:productId" exact>
          <ProductDetailPage />
          <Carousel />
        </Route>
        <Route path="/product/:productId/carousel/">
          <Carousel />
        </Route>
        <Route path='/404'>
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
