'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// O HTML inicial já traz o valor final (útil para buscadores, IAs e quem desativa animações);
// a contagem de 0 até o valor só acontece no navegador, quando o número aparece na tela.
export default function CountUp({ to, prefix = '', suffix = '', duration = 1600, active = true }) {
  const [value, setValue] = useState(to);
  const ref = useRef(null);
  const started = useRef(false);

  useIsoLayoutEffect(() => {
    if (!active || started.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(to * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, active]);

  return <span ref={ref}>{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>;
}
