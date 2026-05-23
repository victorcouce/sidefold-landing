import { useState, useEffect, useRef } from 'react';

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setTimeout(() => setVisible(true), delay);
    };
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { reveal(); obs.unobserve(node); } },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(node);
    const fallback = setTimeout(() => {
      if (!done && node) {
        const r = node.getBoundingClientRect();
        if (r.top < window.innerHeight + 50) reveal();
      }
    }, 400);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
