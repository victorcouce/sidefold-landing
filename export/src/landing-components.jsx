const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   ScrollReveal — fade-up on enter viewport
   ============================================================ */
function ScrollReveal({ children, delay = 0, className = '' }) {
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
    // Fallback: if element is already above the fold, fire immediately
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

/* ============================================================
   Icons — minimal SVG inline icons
   ============================================================ */
const IconFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconFolder = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
  </svg>
);
const IconDots = () => (
  <svg width="16" height="14" viewBox="0 0 28 20">
    <circle cx="5" cy="10" r="4" fill="#F472B6" /><circle cx="14" cy="10" r="4" fill="#34D399" />
    <circle cx="23" cy="10" r="4" fill="#FBBF24" />
  </svg>
);
const IconLayers = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);
const IconPerson = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMoon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const IconSync = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);
const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

/* ============================================================
   Chip — small colored badge
   ============================================================ */
function Chip({ color = 'blue', icon, children }) {
  const palette = {
    blue:   { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
    purple: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
    pink:   { bg: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' },
    green:  { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    multi:  { bg: '#FAFAFA', text: '#52525B', border: '#E4E4E7' },
  };
  const c = palette[color] || palette.blue;
  return (
    <span className="chip" style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}` }}>
      {icon && <span className="chip-icon">{icon}</span>}
      {children}
    </span>
  );
}

/* ============================================================
   YouTubeBadge
   ============================================================ */
function YouTubeBadge() {
  return (
    <div className="yt-badge">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#3B82F6" />
        <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Works inside YouTube™</span>
    </div>
  );
}

/* ============================================================
   NavBar — sticky, glass on scroll
   ============================================================ */
function NavBar() {
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
          <img src={window.__resources?.logo || 'assets/logo.png'} alt="" width="30" height="30" />
          <span>Sidefold</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" onClick={() => goTo('features')}>Features</a>
          <a className="nav-link" onClick={() => goTo('privacy')}>Privacy</a>
          <a className="nav-cta" href="https://chromewebstore.google.com/detail/sidefold/ioochdbninijmkmgiahmklhheffphmfa" target="_blank" rel="noopener noreferrer">
            Add to Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   FeatureSection — alternating text + screenshot
   ============================================================ */
function FeatureSection({ id, chips, headline, body, image, reverse, badge }) {
  return (
    <section id={id} className={`feature-section ${reverse ? 'reverse' : ''}`}>
      <ScrollReveal className="feature-text" delay={60}>
        {chips && chips.length > 0 && (
          <div className="chips-row">
            {chips.map((ch, i) => <Chip key={i} color={ch.color} icon={ch.icon}>{ch.label}</Chip>)}
          </div>
        )}
        <h2 className="feature-headline">{headline}</h2>
        <p className="feature-body">{body}</p>
        {badge && <YouTubeBadge />}
      </ScrollReveal>
      <ScrollReveal className="feature-image" delay={180}>
        <div className="screenshot-card">
          <img src={image} alt={headline} loading="lazy" />
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ============================================================
   FeatureCard — grid card with icon
   ============================================================ */
function FeatureCard({ icon, title, description, iconBg, iconColor }) {
  return (
    <ScrollReveal>
      <div className="feature-card">
        <div className="feature-card-icon" style={{ background: iconBg || '#EFF6FF', color: iconColor || '#2563EB' }}>
          {icon}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </ScrollReveal>
  );
}

/* ============================================================
   Exports
   ============================================================ */
Object.assign(window, {
  ScrollReveal, Chip, NavBar, FeatureSection, FeatureCard, YouTubeBadge,
  IconFilter, IconGrid, IconFolder, IconDots, IconLayers, IconPerson,
  IconMoon, IconSync, IconGlobe, IconShield,
});
