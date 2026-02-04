import { useEffect, useRef } from 'react';

const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = el.querySelectorAll('.reveal');
    elements.forEach((target) => observer.observe(target));
    return () => elements.forEach((target) => observer.unobserve(target));
  }, []);

  return ref;
}

export function useRevealOnMount<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = el.querySelectorAll('.reveal');
    elements.forEach((target) => observer.observe(target));
    return () => elements.forEach((target) => observer.unobserve(target));
  }, []);

  return ref;
}
