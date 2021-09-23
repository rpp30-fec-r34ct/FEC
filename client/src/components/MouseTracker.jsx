import { useState, useEffect } from 'react';

const useMouse = () => {
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const listener =
      window.addEventListener('mousemove',
        e => setMouseLocation({ x: e.clientX, y: e.clientY }))

    return () => window.removeEventListener('mousemove', listener);
  }, [])

  return mouseLocation;
}

export default useMouse;