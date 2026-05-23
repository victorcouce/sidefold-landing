import { useCallback } from 'react';
import NavBar from './components/NavBar';
import FeatureSection from './components/FeatureSection';
import FeatureCard from './components/FeatureCard';
import ScrollReveal from './components/ScrollReveal';
import {
  IconFilter, IconGrid, IconFolder, IconDots,
  IconLayers, IconPerson, IconMoon, IconSync,
  IconGlobe, IconShield,
} from './components/Icons';

const CWS_URL = 'https://chromewebstore.google.com/detail/sidefold/jgmhkbhbecgiligmcplmmhpjhhpmokgf';

export default function App() {
  const goTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-text hero-enter">
          <h1>Your YouTube subscriptions, finally organized</h1>
          <p className="hero-sub">
            Sidefold adds folders and feed filtering directly inside YouTube.
            No clutter, no learning curve — it just works.
          </p>
          <div className="hero-actions">
            <a className="cta-button" href={CWS_URL} target="_blank" rel="noopener noreferrer">
              Add to Chrome — It's free
            </a>
            <a className="see-how" href="#features" onClick={(e) => { e.preventDefault(); goTo('features'); }}>
              See how it works ↓
            </a>
          </div>
        </div>
        <div className="hero-image hero-enter-delay">
          <div className="screenshot-card">
            <img src="/assets/screenshots/1.png" alt="Organize Subscriptions panel" />
          </div>
        </div>
      </section>

      {/* Features */}
      <div id="features">
        <FeatureSection
          chips={[
            { color: 'blue', icon: <IconFilter />, label: 'Feed filter' },
            { color: 'purple', icon: <IconGrid />, label: 'Category tabs' },
          ]}
          headline="Filter your feed by folder"
          body="Jump straight to the content you care about. On your Subscriptions page, a clean category bar appears at the top. Click any folder to see only videos from those channels."
          image="/assets/screenshots/2.png"
          badge
        />

        <FeatureSection
          reverse
          chips={[
            { color: 'blue', icon: <IconFolder />, label: 'Sidebar folders' },
            { color: 'multi', icon: <IconDots />, label: 'Color-coded categories' },
          ]}
          headline="Folders inside YouTube"
          body="Keep your subscriptions organized without leaving your feed. A clean accordion sidebar lives inside YouTube's navigation — create folders with custom colors, expand them, jump to any channel."
          image="/assets/screenshots/3.png"
          badge
        />

        <FeatureSection
          chips={[
            { color: 'blue', icon: <IconLayers />, label: 'Bulk organizer' },
            { color: 'blue', icon: <IconGrid />, label: 'Grid view' },
          ]}
          headline="All your channels, one view"
          body="Browse every subscription in one organized space. Open the panel to see all channels at once — in grid or list view. Select multiple and assign them to a folder in one action."
          image="/assets/screenshots/5.png"
        />

        <FeatureSection
          reverse
          chips={[
            { color: 'blue', icon: <IconPerson />, label: 'Channel page' },
            { color: 'blue', icon: <IconFolder />, label: 'Quick assign' },
          ]}
          headline="Categorize from any channel"
          body="Assign folders directly from a creator page. A small button appears so you can categorize any channel on the spot — no panels, no detours."
          image="/assets/screenshots/4.png"
        />
      </div>

      {/* Extras Grid */}
      <section className="extras-section">
        <div className="extras-grid">
          <FeatureCard
            icon={<IconMoon />}
            iconBg="#F5F3FF"
            title="Dark mode"
            description="Reads YouTube's theme automatically. Light and dark mode out of the box."
          />
          <FeatureCard
            icon={<IconSync />}
            iconBg="#EFF6FF"
            title="Sync across devices"
            description="Your folders sync across Chrome devices through your Google account. Nothing leaves your browser."
          />
          <FeatureCard
            icon={<IconGlobe />}
            iconBg="#ECFDF5"
            title="7 languages"
            description="English, Spanish, Arabic, Hindi, Indonesian, Portuguese, Chinese."
          />
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="privacy-section">
        <ScrollReveal>
          <div className="privacy-icon"><IconShield /></div>
          <h2>Privacy first</h2>
          <p>
            Zero data collection. Your folders live in chrome.storage — on your device,
            synced via your own Google account. No accounts, no servers, no tracking, no ads.
          </p>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <ScrollReveal>
          <h2>Simple. Native. Fast.</h2>
          <p className="subtitle">Take back your YouTube subscriptions.</p>
          <div>
            <a className="cta-button" href={CWS_URL} target="_blank" rel="noopener noreferrer">
              Add to Chrome — It's free
            </a>
          </div>
          <p className="browsers-note">Works with Chrome, Edge, Brave, and Chromium browsers</p>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-logo" href="#">
            <img src="/assets/logo.svg" alt="" width="26" height="26" />
            <span>Sidefold</span>
          </a>
          <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <span className="footer-tagline">Made with &#9829; for YouTube power users</span>
        </div>
      </footer>
    </>
  );
}
