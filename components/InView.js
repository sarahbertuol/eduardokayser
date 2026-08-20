'use client';
import { useEffect, useRef, useState } from 'react';

export default function InView({ children, className = '', threshold = 0.4, active = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, active]);

  return <div ref={ref} className={visible ? `${className} in-view` : className}>{children}</div>;
}
