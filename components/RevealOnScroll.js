'use client';
import { useEffect } from 'react';

export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = [...document.querySelectorAll('section')].filter(
      el => el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      targets.forEach(el => el.classList.remove('reveal', 'is-visible'));
    };
  }, []);

  return null;
}
