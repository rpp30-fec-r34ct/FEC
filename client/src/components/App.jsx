import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage.jsx';
import QAList from '../QAComponents/QAList.jsx';

const App = (props) => {

  return (
    <Router>
      <h1>PROJECT ATLIER</h1>
      <Switch>
        <Route path="/product/:productId">
          <ProductDetailPage />
          <QAList />
        </Route>
        <Route path="qa/question/:productId">
          <QAList />
        </Route>
      </Switch>
  </Router>
  )
}

export default App;