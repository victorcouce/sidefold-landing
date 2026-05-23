import ScrollReveal from './ScrollReveal';

export default function FeatureCard({ icon, title, description, iconBg, iconColor }) {
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
