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
<<<<<<< HEAD
          <ReviewSection product_id={47421} />
=======
          <ReviewSection />
>>>>>>> c2acb89980fc6c368f0c31d888ee59a530880a86
        </Route>
        <Route path='/product/:productId/carousel/'>
          <Carousel />
        </Route>
        <Route path='/404'>
          <FourOhFour />
        </Route>
<<<<<<< HEAD
        <Route path='/reviewPage'>
          <ReviewSection product_id={47421} />
=======
        <Route path='/reviewPage/:productId'>
          <ReviewSection />
>>>>>>> c2acb89980fc6c368f0c31d888ee59a530880a86
        </Route>
        <Route path='/product/:productId/questions'>
          <QAList />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
