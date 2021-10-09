import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import NavBar from './NavBar.jsx'
import ProductDetailPage from '../PDComponents/ProductDetailPage.jsx'
import FourOhFour from './FourOhFour.jsx'
import Carousel from './relatedProducts/Carousel.jsx'
import ReviewSection from './Review Widget/ReviewSection.jsx'
import QAList from '../QAComponents/QAList.jsx'
import ClickTracker from './ClickTracker.jsx'
import {ThemeProvider} from 'styled-components'
import {GlobalTheme} from './StyledComponents/GlobalTheme.jsx'
import {lightTheme, darkTheme} from './StyledComponents/Themes.jsx'
import {useDarkMode} from './Shared/useDarkMode.jsx'
import Toggle from './StyledComponents/Toggle.jsx'

const App = (props) => {
  const [theme, toggleTheme, isMounted] = useDarkMode()

  const themeMode = theme === 'light' ? lightTheme : darkTheme


  if (!isMounted) {
    return <div/>
  }

  return (
    <Router>
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalTheme/>
      <NavBar />
      <Toggle theme={theme} toggleTheme={toggleTheme} />
      <Switch>
        <Route path='/:productId(\d{5})'>
          <div id='App'>
            <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'Product Detail Page') }}><ProductDetailPage theme={theme}/> </div>} />
            <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'Carousel') }}><Carousel theme={theme}/> </div>} />
            <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'QAList') }}><QAList /> </div>} />
            <ClickTracker render={submitTrackedInfo => <div onClick={(e) => { submitTrackedInfo(e, 'ReviewSection') }}> <ReviewSection /> </div>} />
          </div>
        </Route>
        <Route path='/product/:productId/carousel/'>
          <Carousel />
        </Route>
        <Route path='/reviewPage/:productId'>
          <ReviewSection />
        </Route>
        <Route path='/questions/:productId'>
          <QAList />
        </Route>
        <Route path='/404'>
          <FourOhFour />
        </Route>
      </Switch>
      </>
    </ThemeProvider>
  </Router>
  )
}

export default App
