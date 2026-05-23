import ScrollReveal from './ScrollReveal';

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

export default function FeatureSection({ id, chips, headline, body, image, reverse, badge }) {
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
