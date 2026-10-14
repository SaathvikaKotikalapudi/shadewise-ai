import React, { useState, useEffect } from 'react';
import {
  Thermometer,
  Flame,
  Droplets,
  Sun,
  Wind,
  RotateCw,
  AlertOctagon,
  ShieldAlert,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { demoCities } from '../data/demoData';
import { fetchHeatConditions } from '../services/api';

export default function HeatCheck({ t, lang, onShowToast }) {
  const [selectedCityId, setSelectedCityId] = useState('hyderabad');
  const [weatherData, setWeatherData] = useState(demoCities[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCityWeather(selectedCityId);
  }, [selectedCityId]);

  const loadCityWeather = async (cityId) => {
    setLoading(true);
    try {
      const data = await fetchHeatConditions(cityId);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadCityWeather(selectedCityId);
    onShowToast('Heat conditions refreshed with latest simulated sensor data!', 'info');
  };

  // Determine heat risk visual properties
  const riskType = weatherData.heatRisk || 'high';
  const riskDescription = t.heatCheck.heatRiskLevels[riskType] || t.heatCheck.heatRiskLevels.high;

  return (
    <section className="section" id="heat-check">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="demo-pill">{t.heatCheck.demoBadge}</span>
          <h2>{t.heatCheck.title}</h2>
          <p>{t.heatCheck.subtitle}</p>
        </div>

        {/* City Selector and Refresh Bar */}
        <div className="heat-controls-bar">
          <div className="city-select-box">
            <label htmlFor="city-select-dropdown">
              <span style={{ display: 'inline-block', marginRight: '6px' }}>📍</span>
              {t.heatCheck.locationLabel}
            </label>
            <select
              id="city-select-dropdown"
              className="city-select"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              disabled={loading}
            >
              {demoCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {lang === 'te' ? city.nameTe : city.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Peak Heat Window: <strong>{weatherData.peakWindow}</strong>
            </span>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RotateCw size={14} className={loading ? 'spin-anim' : ''} />
              <span>{loading ? t.heatCheck.refreshing : t.heatCheck.refreshBtn}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Thermal Metrics */}
        <div className="heat-metrics-grid">
          {/* Air Temperature */}
          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">{t.heatCheck.currentTemp}</span>
              <div className="metric-icon-wrap orange">
                <Thermometer size={22} />
              </div>
            </div>
            <div className="metric-value">{weatherData.temp}°C</div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Urban ambient thermometer
            </span>
          </div>

          {/* Feels Like (Heat Index) */}
          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">{t.heatCheck.feelsLike}</span>
              <div className="metric-icon-wrap orange">
                <Flame size={22} />
              </div>
            </div>
            <div className="metric-value" style={{ color: 'var(--heat-extreme)' }}>
              {weatherData.feelsLike}°C
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Combined heat + humidity index
            </span>
          </div>

          {/* Humidity */}
          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">{t.heatCheck.humidity}</span>
              <div className="metric-icon-wrap">
                <Droplets size={22} />
              </div>
            </div>
            <div className="metric-value">{weatherData.humidity}%</div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Affects natural sweat cooling rate
            </span>
          </div>

          {/* UV Radiation Index */}
          <div className="metric-card">
            <div className="metric-card-top">
              <span className="metric-label">{t.heatCheck.uvIndex}</span>
              <div className="metric-icon-wrap gold">
                <Sun size={22} />
              </div>
            </div>
            <div className="metric-value" style={{ color: '#B58406' }}>
              {weatherData.uvIndex} <span style={{ fontSize: '1rem', fontWeight: 600 }}>/ 12</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Very High direct solar radiation
            </span>
          </div>
        </div>

        {/* Heat Risk Level Banner */}
        <div className="risk-level-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: riskType === 'extreme' ? '#FEE2E2' : '#FFEDD5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: riskType === 'extreme' ? 'var(--heat-extreme)' : 'var(--amber-orange)',
              }}
            >
              <AlertOctagon size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span className={`risk-tag ${riskType}`}>{riskType.toUpperCase()} RISK</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--forest-900)' }}>
                  {t.heatCheck.heatRiskTitle}
                </strong>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{riskDescription}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Neighborhood Tree Canopy</span>
            <span style={{ fontWeight: 700, color: 'var(--forest-800)', fontSize: '0.95rem' }}>
              {weatherData.treeCanopyDensity}
            </span>
          </div>
        </div>

        {/* Practical Heat-Safety Guidance Grid */}
        <div>
          <h3 style={{ fontSize: '1.28rem', marginBottom: '18px', color: 'var(--forest-900)' }}>
            {t.heatCheck.adviceHeading}
          </h3>
          <div className="guidance-cards-grid">
            {t.heatCheck.tips.map((tip, idx) => (
              <div key={idx} className="guidance-card">
                <div className="guidance-card-header">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--forest-100)',
                      color: 'var(--forest-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h4>{tip.title}</h4>
                </div>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
