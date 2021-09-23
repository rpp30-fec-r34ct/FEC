import axios from 'axios'
import React from 'react'

const ClickTrackerComponent = (props) => {
  const submitTrackedInfo = (e, widget) => {
    console.log(e.target)
    axios.post('/api/interactions', {
      element: `${e.target}`,
      time: Date.now(),
      widget: widget
      // TODO: Update to a dynamic widget
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  return (
    <>
      {props.render(submitTrackedInfo)}
    </>
  )
}

export default ClickTrackerComponent
