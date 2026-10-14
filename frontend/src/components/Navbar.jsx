import React, { useState } from 'react';
import { Leaf, Menu, X, Globe, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, t, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="nav-logo"
        >
          <div className="nav-logo-icon">
            <Leaf size={24} />
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-title">{t.nav.brand}</span>
            <span className="nav-logo-sub">{t.nav.taglineBadge}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          <li>
            <a
              href="#heat-check"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('heat-check');
              }}
            >
              {t.nav.heatCheck}
            </a>
          </li>
          <li>
            <a
              href="#journey"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('journey');
              }}
            >
              {t.nav.journeyPlanner}
            </a>
          </li>
          <li>
            <a
              href="#heat-gaps"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('heat-gaps');
              }}
            >
              {t.nav.communityGaps}
            </a>
          </li>
          <li>
            <a
              href="#ai-companion"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('ai-companion');
              }}
            >
              {t.nav.aiCompanion}
            </a>
          </li>
        </ul>

        {/* Language Switcher and Action Button */}
        <div className="nav-actions">
          <div className="lang-switch-group" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
              onClick={() => setLang('te')}
              aria-pressed={lang === 'te'}
            >
              తెలుగు
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => handleNavClick('journey')}
          >
            <Sparkles size={16} />
            <span>{t.nav.quickPlanBtn}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
