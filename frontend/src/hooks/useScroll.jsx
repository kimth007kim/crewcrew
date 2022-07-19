import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
      setScrollY(0);
    };
  }, []);

  return {
    scrollY,
  };
}
