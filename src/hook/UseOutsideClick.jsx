import { useEffect, useRef } from 'react';

const useOutsideClick = (onClick) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // console.log(ref.current?.children, event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClick]);

  return ref;
};

export default useOutsideClick;
