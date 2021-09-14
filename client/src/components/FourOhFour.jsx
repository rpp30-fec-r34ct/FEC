import React from 'react'
import { useLocation } from 'react-router-dom'

const FourOhFourComponent = (props) => {
  const location = useLocation()

  return (
    <div>
      <h1>404</h1>
      <h3>Sorry but that product could not be found :/</h3>
      {location.state.errorMsg ? <h4>{location.state.errorMsg.message}</h4> : <div> </div>}
    </div>
  )
}

export default FourOhFourComponent
