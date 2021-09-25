import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react';


const MouseTracker = ({ props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(null);
  const [element, setElement] = useState(null);
  const [widget, setWidget] = useState(null);

  const elementRef = useRef();

  useEffect(() => {

    const listener = document.body.addEventListener('mouseover',
      (e) => setPosition({ x: e.clientX, y: e.clientY }))

    return () => document.body.removeEventListener('mousemove', listener);

    // const divElement = elementRef.current;
    // console.log(divElement); //SHOULD LOG <DIV>
  }, [])


  const handleMouseClick = (e, widget) => {
    const { data } = axios.post(`/api/interactions`, {
      element: 'Element Name',
      widget: 'Component Name',
      time: 'Time'
    })
      .then(response => console.log('data', response.data))
      .catch(error => console.log('err', error))
  }


  return (
    <div>
      {props.render(position.x, position.y)}
    </div>

  )
}

export default MouseTracker