const CWS_URL = 'https://chromewebstore.google.com/detail/sidefold/ioochdbninijmkmgiahmklhheffphmfa';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bgTone": "warm",
  "ctaColor": "dark",
  "animations": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const bgMap = { warm: '#F5F3F0', neutral: '#F4F4F5', cool: '#EEF1F6' };
  const bg = bgMap[t.bgTone] || bgMap.warm;
  const ctaBg = t.ctaColor === 'blue' ? '#3B82F6' : '#18181B';
  const ctaHover = t.ctaColor === 'blue' ? '#2563EB' : '#27272A';

  React.useEffect(() => {
    document.body.style.background = bg;
    document.documentElement.style.setProperty('--cta-bg', ctaBg);
    document.documentElement.style.setProperty('--cta-hover', ctaHover);
    document.documentElement.style.setProperty('--bg', bg);
  }, [bg, ctaBg, ctaHover]);

  React.useEffect(() => {
    document.body.classList.toggle('no-animations', !t.animations);
  }, [t.animations]);

  const goTo = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const ctaStyle = { background: ctaBg };

  return (
    <React.Fragment>
      <NavBar />

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-text hero-enter">
          <h1>Your YouTube subscriptions, finally organized</h1>
          <p className="hero-sub">
            Sidefold adds folders and feed filtering directly inside YouTube.
            No clutter, no learning curve — it just works.
          </p>
          <div className="hero-actions">
            <a className="cta-button" href={CWS_URL} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
              Add to Chrome — It's free
            </a>
            <a className="see-how" href="#features" onClick={(e) => { e.preventDefault(); goTo('features'); }}>
              See how it works ↓
            </a>
          </div>
        </div>
        <div className="hero-image hero-enter-delay">
          <div className="screenshot-card">
            <img src={window.__resources?.ss1 || 'assets/screenshots/1.png'} alt="Organize Subscriptions panel" />
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <div id="features">
        <FeatureSection
          chips={[
            { color: 'blue', icon: <IconFilter />, label: 'Feed filter' },
            { color: 'purple', icon: <IconGrid />, label: 'Category tabs' },
          ]}
          headline="Filter your feed by folder"
          body="Jump straight to the content you care about. On your Subscriptions page, a clean category bar appears at the top. Click any folder to see only videos from those channels."
          image={window.__resources?.ss2 || 'assets/screenshots/2.png'}
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
          image={window.__resources?.ss3 || 'assets/screenshots/3.png'}
          badge
        />

        <FeatureSection
          chips={[
            { color: 'blue', icon: <IconLayers />, label: 'Bulk organizer' },
            { color: 'blue', icon: <IconGrid />, label: 'Grid view' },
          ]}
          headline="All your channels, one view"
          body="Browse every subscription in one organized space. Open the panel to see all channels at once — in grid or list view. Select multiple and assign them to a folder in one action."
          image={window.__resources?.ss5 || 'assets/screenshots/5.png'}
        />

        <FeatureSection
          reverse
          chips={[
            { color: 'blue', icon: <IconPerson />, label: 'Channel page' },
            { color: 'blue', icon: <IconFolder />, label: 'Quick assign' },
          ]}
          headline="Categorize from any channel"
          body="Assign folders directly from a creator page. A small button appears so you can categorize any channel on the spot — no panels, no detours."
          image={window.__resources?.ss4 || 'assets/screenshots/4.png'}
        />
      </div>

      {/* ==================== EXTRAS GRID ==================== */}
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

      {/* ==================== PRIVACY ==================== */}
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

      {/* ==================== FINAL CTA ==================== */}
      <section className="final-cta">
        <ScrollReveal>
          <h2>Simple. Native. Fast.</h2>
          <p className="subtitle">Take back your YouTube subscriptions.</p>
          <div>
            <a className="cta-button" href={CWS_URL} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
              Add to Chrome — It's free
            </a>
          </div>
          <p className="browsers-note">Works with Chrome, Edge, Brave, and Chromium browsers</p>
        </ScrollReveal>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-logo" href="#">
            <img src={window.__resources?.logo || 'assets/logo.png'} alt="" width="26" height="26" />
            <span>Sidefold</span>
          </a>
          <div className="footer-links">
            <a href="https://github.com/victorcouce/Sidefold" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:victor.couce@gmail.com">Contact</a>
            <a href="https://victorcouce.github.io/Sidefold/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>
          <span className="footer-tagline">Made with ♥ for YouTube power users</span>
        </div>
      </footer>

      {/* ==================== TWEAKS ==================== */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Background">
          <TweakRadio
            label="Tone"
            value={t.bgTone}
            options={['warm', 'neutral', 'cool']}
            onChange={(v) => setTweak('bgTone', v)}
          />
        </TweakSection>
        <TweakSection title="CTA Button">
          <TweakRadio
            label="Color"
            value={t.ctaColor}
            options={['dark', 'blue']}
            onChange={(v) => setTweak('ctaColor', v)}
          />
        </TweakSection>
        <TweakSection title="Motion">
          <TweakToggle
            label="Scroll animations"
            value={t.animations}
            onChange={(v) => setTweak('animations', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
