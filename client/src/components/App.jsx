import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductDetailPage from './ProductDetailPage.jsx'
import FourOhFour from './FourOhFour.jsx'
import Carousel from './Carousel.jsx'
import ReviewSection from './Review Widget/ReviewSection.jsx'
import QAList from '../QAComponents/QAList.jsx'

const App = (props) => {
  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path='/product/:productId' exact>
          <ProductDetailPage />
          <Carousel />
          <QAList />
          <ReviewSection />
        </Route>
        <Route path='/product/:productId/carousel/'>
          <Carousel />
        </Route>
        <Route path='/404'>
          <FourOhFour />
        </Route>
        <Route path='/reviewPage/:productId'>
          <ReviewSection />
        </Route>
        <Route path='/product/:productId/questions'>
          <QAList />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
