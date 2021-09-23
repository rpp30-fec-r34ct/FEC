import { useState, useEffect } from 'react';

const useMouse = () => {
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [element, setElement] = useState(null);

  useEffect(() => {
    const moveListener =
      window.addEventListener('mousemove', (e) =>
        setMouseLocation({ x: e.clientX, y: e.clientY })
      );

    const clickListener =
      window.addEventListener('click', (e) =>
        setElement(e.target.toString())
      );


    return () => {
      window.removeEventListener('mousemove', listener);
      window.removeEventListener('click', clickListener);
    };
  }, []);

  return { ...mouseLocation, element };
};

export default useMouse;