import axios from 'axios'
import React from 'react'

const ClickTrackerComponent = (props) => {
  const submitTrackedInfo = (e, widget) => {
    console.log(e.target)
    axios.post('/api/interactions', {
      element: `${e.target.outerHTML}`,
      time: `${Date.now()}`,
      widget: widget
    })
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
  }

  return (
    <>
      {props.render(submitTrackedInfo)}
    </>
  )
}

export default ClickTrackerComponent
