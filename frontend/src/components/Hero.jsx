import React from 'react';
import { Compass, ThermometerSun, AlertTriangle, ArrowRight, ShieldCheck, TreePine, Droplets, SunMedium } from 'lucide-react';

export default function Hero({ t, onNavigate }) {
  return (
    <header className="hero-section" id="home">
      <div className="container hero-grid">
        {/* Left Column: Hero Copy & Calls to Action */}
        <div className="hero-content">
          <div className="hero-tagline">
            <TreePine size={18} color="var(--amber-orange)" />
            <span>{t.hero.tagline}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-highlight">{t.hero.titleHighlight}</span>{' '}
            {t.hero.titleRest}
          </h1>

          <p className="hero-desc">{t.hero.description}</p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => onNavigate('journey')}
            >
              <Compass size={18} />
              <span>{t.hero.ctaPrimary}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onNavigate('heat-check')}
            >
              <ThermometerSun size={18} />
              <span>{t.hero.ctaSecondary}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              style={{ borderStyle: 'dashed' }}
              onClick={() => onNavigate('heat-gaps')}
            >
              <AlertTriangle size={18} color="var(--amber-orange)" />
              <span>{t.hero.ctaReport}</span>
            </button>
          </div>

          {/* Badges */}
          <div className="hero-badges-row">
            <div className="hero-badge-item">
              <ShieldCheck size={16} />
              <span>{t.hero.badgeAi}</span>
            </div>
            <div className="hero-badge-item">
              <TreePine size={16} />
              <span>{t.hero.badgeBilingual}</span>
            </div>
            <div className="hero-badge-item">
              <Droplets size={16} />
              <span>{t.hero.badgeOpenData}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Interactive Route Preview Card */}
        <div className="hero-visual">
          <div className="hero-preview-card">
            <div className="hero-preview-header">
              <div>
                <span className="demo-pill forest">Urban Heat Relief Preview</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>Smart Route Comparison</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Ambient Heat</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--amber-orange)' }}>38°C (High)</strong>
              </div>
            </div>

            <div className="hero-preview-route-preview">
              {/* Shaded Route Bar */}
              <div className="route-preview-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'var(--forest-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--forest-800)',
                    }}
                  >
                    <TreePine size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--forest-900)' }}>
                      🌿 ShadeWise Shaded Path
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      82% Tree Canopy • 2 Refill Stations
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 800, color: 'var(--forest-800)', fontSize: '1.1rem' }}>18 min</span>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                    4.2°C Cooler
                  </span>
                </div>
              </div>

              {/* Direct Exposed Route Bar */}
              <div className="route-preview-bar exposed">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'var(--amber-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--amber-orange)',
                    }}
                  >
                    <SunMedium size={22} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--forest-900)' }}>
                      ☀️ Fastest Asphalt Route
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      22% Canopy • Zero Water Points
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 800, color: 'var(--amber-orange)', fontSize: '1.1rem' }}>14 min</span>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--heat-extreme)', fontWeight: 600 }}>
                    High Heat Risk
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="hero-stats-grid">
              {t.hero.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat-box">
                  <div className="hero-stat-val">{stat.value}</div>
                  <div className="hero-stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
