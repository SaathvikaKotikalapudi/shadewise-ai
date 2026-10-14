import React from 'react';
import { Leaf, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function Footer({ t, onNavigate }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--forest-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Leaf size={20} />
              </div>
              <h3 style={{ margin: 0 }}>{t.nav.brand}</h3>
            </div>
            <p>{t.footer.tagline}</p>
            <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--sun-gold)', fontSize: '0.82rem', fontWeight: 600 }}>
              <HeartHandshake size={16} />
              <span>{t.footer.builtFor}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>{t.footer.navigationHeading}</h4>
            <ul>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#heat-check"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('heat-check');
                  }}
                >
                  {t.nav.heatCheck}
                </a>
              </li>
              <li>
                <a
                  href="#journey"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('journey');
                  }}
                >
                  {t.nav.journeyPlanner}
                </a>
              </li>
              <li>
                <a
                  href="#heat-gaps"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('heat-gaps');
                  }}
                >
                  {t.nav.communityGaps}
                </a>
              </li>
              <li>
                <a
                  href="#ai-companion"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('ai-companion');
                  }}
                >
                  {t.nav.aiCompanion}
                </a>
              </li>
            </ul>
          </div>

          {/* Planned Tech Stack Column */}
          <div className="footer-col">
            <h4>{t.footer.techHeading}</h4>
            <ul>
              {t.footer.techList.map((item, idx) => (
                <li key={idx}>🌿 {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Responsible AI Disclaimer Banner */}
        <div className="footer-disclaimer-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <ShieldAlert size={16} color="var(--amber-light)" />
            <h5>{t.footer.disclaimerTitle}</h5>
          </div>
          <p>{t.footer.disclaimerText}</p>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ShadeWise AI. {t.footer.rights}</span>
          <span>Open-Source Community Heat Resilience Project</span>
        </div>
      </div>
    </footer>
  );
}
