import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductDetailPage from '../PDComponents/ProductDetailPage.jsx'
import FourOhFour from './FourOhFour.jsx'
import Carousel from './relatedProducts/Carousel.jsx'
import ReviewSection from './Review Widget/ReviewSection.jsx'
import QAList from '../QAComponents/QAList.jsx'
import ClickTracker from './ClickTracker.jsx'

const App = (props) => {
  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path='/product/:productId' exact>
          <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'Product Detail Page') }}><ProductDetailPage /> </div>} />
          <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'Carousel') }}><Carousel /> </div>} />
          <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'QAList') }}><QAList /> </div>} />
          <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'ReviewSection') }}> <ReviewSection /> </div>} />
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