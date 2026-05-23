import { useState, useEffect, useCallback } from 'react';

const CWS_URL = 'https://chromewebstore.google.com/detail/sidefold/jgmhkbhbecgiligmcplmmhpjhhpmokgf';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const goTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/assets/logo.svg" alt="" width="30" height="30" />
          <span>Sidefold</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" onClick={() => goTo('features')}>Features</a>
          <a className="nav-link" onClick={() => goTo('privacy')}>Privacy</a>
          <a className="nav-cta" href={CWS_URL} target="_blank" rel="noopener noreferrer">
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}
