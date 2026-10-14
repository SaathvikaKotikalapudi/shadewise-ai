import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ArrowUpDown,
  Clock,
  Compass,
  TreePine,
  Sun,
  Bus,
  Check,
  AlertCircle,
  Droplets,
  Flame,
} from 'lucide-react';
import LeafletMap from './LeafletMap';
import { calculateComfortRoutes } from '../services/api';

export default function JourneyPlanner({ t, onShowToast }) {
  const [origin, setOrigin] = useState('Ameerpet Metro Station, Gate 2');
  const [destination, setDestination] = useState('City Central Hospital & Heritage Park');
  const [mode, setMode] = useState('walk');
  const [departureTime, setDepartureTime] = useState('12:30');
  const [calculating, setCalculating] = useState(false);
  const [selectedRouteKey, setSelectedRouteKey] = useState('recommended');
  const [hasCalculated, setHasCalculated] = useState(true);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    onShowToast('Origin and destination swapped.', 'info');
  };

  const handleQuickRoute = (sample) => {
    setOrigin(sample.from);
    setDestination(sample.to);
    onShowToast(`Loaded sample journey: ${sample.name}`, 'info');
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) {
      onShowToast('Please provide both starting point and destination.', 'error');
      return;
    }

    setCalculating(true);
    try {
      await calculateComfortRoutes(origin, destination, mode);
      setHasCalculated(true);
      onShowToast('Calculated thermal-comfort route comparisons.', 'success');
    } catch (err) {
      console.error(err);
      onShowToast('Unable to calculate routes.', 'error');
    } finally {
      setCalculating(false);
    }
  };

  const handleSelectRoute = (routeKey) => {
    setSelectedRouteKey(routeKey);
    onShowToast(t.journey.selectedRouteSuccess, 'success');
  };

  return (
    <section className="section section-alt" id="journey" aria-labelledby="journey-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="demo-pill forest">{t.journey.demoBadge}</span>
          <h2 id="journey-heading">{t.journey.title}</h2>
          <p>{t.journey.subtitle}</p>
        </div>

        {/* Planner Layout Grid */}
        <div className="journey-layout">
          {/* Left: Input Form Card */}
          <div className="planner-card">
            <form onSubmit={handleCalculate} aria-label="Journey planning form">
              {/* Origin Field */}
              <div className="form-group">
                <label htmlFor="origin-input">{t.journey.originLabel}</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} color="var(--forest-700)" aria-hidden="true" />
                  <input
                    id="origin-input"
                    type="text"
                    className="text-input"
                    placeholder={t.journey.originPlaceholder}
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    maxLength={150}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="swap-btn-wrap">
                <button
                  type="button"
                  className="swap-btn"
                  title={t.journey.swapBtnTitle}
                  aria-label={t.journey.swapBtnTitle}
                  onClick={handleSwap}
                >
                  <ArrowUpDown size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Destination Field */}
              <div className="form-group">
                <label htmlFor="dest-input">{t.journey.destinationLabel}</label>
                <div className="input-with-icon">
                  <Navigation className="input-icon" size={18} color="var(--amber-orange)" aria-hidden="true" />
                  <input
                    id="dest-input"
                    type="text"
                    className="text-input"
                    placeholder={t.journey.destinationPlaceholder}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    maxLength={150}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Mode and Departure Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <label htmlFor="mode-select" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    {t.journey.modeLabel}
                  </label>
                  <select
                    id="mode-select"
                    className="city-select"
                    style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <option value="walk">{t.journey.modes.walk}</option>
                    <option value="transitWalk">{t.journey.modes.transitWalk}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="time-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    {t.journey.timeLabel}
                  </label>
                  <input
                    id="time-input"
                    type="time"
                    className="text-input"
                    style={{ paddingLeft: '14px' }}
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px 20px' }}
                disabled={calculating}
              >
                <Compass size={18} className={calculating ? 'spin-anim' : ''} />
                <span>{calculating ? t.journey.calculating : t.journey.findBtn}</span>
              </button>
            </form>

            {/* Quick Presets */}
            <div className="quick-routes-box">
              <h5>{t.journey.quickRoutesLabel}</h5>
              {t.journey.quickRoutes.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-route-chip"
                  onClick={() => handleQuickRoute(sample)}
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Map Area */}
          <div>
            <LeafletMap activeRoute={selectedRouteKey} t={t} />
          </div>
        </div>

        {/* Route Comparisons Area */}
        {hasCalculated && (
          <div style={{ marginTop: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '8px', color: 'var(--forest-900)' }}>
                {t.journey.comparisonTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {t.journey.comparisonDisclaimer}
              </p>
            </div>

            <div className="route-cards-list">
              {/* Option 1: ShadeWise Recommended */}
              <div className={`route-card ${selectedRouteKey === 'recommended' ? 'recommended' : ''}`}>
                <div className="route-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="route-badge green">{t.journey.routes.recommended.badge}</span>
                    <h4 style={{ fontSize: '1.15rem' }}>{t.journey.routes.recommended.title}</h4>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedRouteKey === 'recommended' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectRoute('recommended')}
                  >
                    {selectedRouteKey === 'recommended' && <Check size={14} />}
                    <span>{t.journey.selectRouteBtn}</span>
                  </button>
                </div>

                <div className="route-metrics-row">
                  <span className="route-metric-pill">
                    <Clock size={16} color="var(--forest-700)" />
                    <strong>{t.journey.routes.recommended.time}</strong> ({t.journey.routes.recommended.distance})
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--forest-700)' }}>
                    <TreePine size={16} />
                    <strong>{t.journey.routes.recommended.shadeScore}</strong>
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--heat-low)' }}>
                    <Flame size={16} />
                    {t.journey.routes.recommended.heatStrain}
                  </span>
                  <span className="route-metric-pill" style={{ color: '#0284C7' }}>
                    <Droplets size={16} />
                    {t.journey.routes.recommended.waterStops}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {t.journey.routes.recommended.summary}
                </p>
              </div>

              {/* Option 2: Fastest Direct Exposed Route */}
              <div className={`route-card ${selectedRouteKey === 'fastest' ? 'recommended' : ''}`}>
                <div className="route-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="route-badge orange">{t.journey.routes.fastest.badge}</span>
                    <h4 style={{ fontSize: '1.15rem' }}>{t.journey.routes.fastest.title}</h4>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedRouteKey === 'fastest' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectRoute('fastest')}
                  >
                    {selectedRouteKey === 'fastest' && <Check size={14} />}
                    <span>{t.journey.selectRouteBtn}</span>
                  </button>
                </div>

                <div className="route-metrics-row">
                  <span className="route-metric-pill">
                    <Clock size={16} color="var(--amber-orange)" />
                    <strong>{t.journey.routes.fastest.time}</strong> ({t.journey.routes.fastest.distance})
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--amber-orange)' }}>
                    <Sun size={16} />
                    <strong>{t.journey.routes.fastest.shadeScore}</strong>
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--heat-high)' }}>
                    <Flame size={16} />
                    {t.journey.routes.fastest.heatStrain}
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--text-muted)' }}>
                    <Droplets size={16} />
                    {t.journey.routes.fastest.waterStops}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {t.journey.routes.fastest.summary}
                </p>
              </div>

              {/* Option 3: Transit + Covered Hop */}
              <div className={`route-card ${selectedRouteKey === 'transit' ? 'recommended' : ''}`}>
                <div className="route-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="route-badge transit">{t.journey.routes.transit.badge}</span>
                    <h4 style={{ fontSize: '1.15rem' }}>{t.journey.routes.transit.title}</h4>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedRouteKey === 'transit' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectRoute('transit')}
                  >
                    {selectedRouteKey === 'transit' && <Check size={14} />}
                    <span>{t.journey.selectRouteBtn}</span>
                  </button>
                </div>

                <div className="route-metrics-row">
                  <span className="route-metric-pill">
                    <Clock size={16} color="#1E40AF" />
                    <strong>{t.journey.routes.transit.time}</strong> ({t.journey.routes.transit.distance})
                  </span>
                  <span className="route-metric-pill" style={{ color: '#1E40AF' }}>
                    <Bus size={16} />
                    <strong>{t.journey.routes.transit.shadeScore}</strong>
                  </span>
                  <span className="route-metric-pill" style={{ color: 'var(--heat-low)' }}>
                    <Flame size={16} />
                    {t.journey.routes.transit.heatStrain}
                  </span>
                  <span className="route-metric-pill" style={{ color: '#0284C7' }}>
                    <Droplets size={16} />
                    {t.journey.routes.transit.waterStops}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {t.journey.routes.transit.summary}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
