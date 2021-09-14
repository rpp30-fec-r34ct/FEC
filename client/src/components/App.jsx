import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductDetailPage from './ProductDetailPage.jsx'
import FourOhFour from './FourOhFour.jsx'

const App = (props) => {
  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path='/product/:productId'>
          <ProductDetailPage />
        </Route>
        <Route path='/404'>
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
