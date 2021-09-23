import { useState, useEffect } from 'react';

const useMouse = (ref, componentName) => {
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [element, setElement] = useState(null);

  const node = ref.current;

  useEffect(() => {
    const moveListener = node?.addEventListener('mousemove', (e) =>
      setMouseLocation({ x: e.clientX, y: e.clientY });
    );

  const clickListener = node?.addEventListener('click', (e) =>
    setElement(e.target.toString());
  alert(`clicked ${componentName}`);
      );


return () => {
  node.removeEventListener('mousemove', listener);
  node.removeEventListener('click', clickListener);
};
}, [ref, componentName]);

return { ...mouseLocation, element, componentName };
};

export default useMouse;