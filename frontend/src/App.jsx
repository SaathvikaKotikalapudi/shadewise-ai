import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeatCheck from './components/HeatCheck';
import JourneyPlanner from './components/JourneyPlanner';
import AiCompanion from './components/AiCompanion';
import HeatGapReport from './components/HeatGapReport';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const [toasts, setToasts] = useState([]);

  const t = translations[lang] || translations.en;

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app-root">
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onNavigate={scrollToSection}
      />

      <main id="main-content" tabIndex="-1">
        <Hero
          t={t}
          onNavigate={scrollToSection}
        />

        <HeatCheck
          t={t}
          lang={lang}
          onShowToast={showToast}
        />

        <JourneyPlanner
          t={t}
          onShowToast={showToast}
        />

        <AiCompanion
          t={t}
          lang={lang}
          onShowToast={showToast}
        />

        <HeatGapReport
          t={t}
          onShowToast={showToast}
        />
      </main>

      <Footer
        t={t}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
