import React, { useState } from 'react';
import {
  AlertTriangle,
  Send,
  ThumbsUp,
  Filter,
  CheckCircle,
  MapPin,
  Clock,
  Droplets,
  TreePine,
  Bus,
  Flame,
} from 'lucide-react';
import { initialHeatReports } from '../data/demoData';

export default function HeatGapReport({ t, onShowToast }) {
  const [reports, setReports] = useState(initialHeatReports);
  const [category, setCategory] = useState('missingShade');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('high');
  const [description, setDescription] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedReports, setConfirmedReports] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.trim() || !description.trim()) {
      onShowToast(t.heatGaps.validationError, 'error');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const newReport = {
        id: `gap-${Date.now()}`,
        category,
        location: location.trim(),
        priority,
        description: description.trim(),
        upvotes: 1,
        timestamp: 'Just now',
        status: 'Recently logged by commuter',
      };

      setReports((prev) => [newReport, ...prev]);
      setLocation('');
      setDescription('');
      setSubmitting(false);
      onShowToast(t.heatGaps.formSuccess, 'success');
    }, 450);
  };

  const handleConfirmIssue = (reportId) => {
    if (confirmedReports[reportId]) {
      onShowToast('You have already confirmed this issue!', 'info');
      return;
    }

    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
    setConfirmedReports((prev) => ({ ...prev, [reportId]: true }));
    onShowToast('Issue confirmed! Upvote registered for municipal prioritization.', 'success');
  };

  const filteredReports =
    selectedFilter === 'all'
      ? reports
      : reports.filter((r) => r.category === selectedFilter);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'waterUnavailable':
        return <Droplets size={16} color="#0284C7" />;
      case 'missingShade':
        return <TreePine size={16} color="var(--forest-700)" />;
      case 'unshadedBusStop':
        return <Bus size={16} color="var(--amber-orange)" />;
      default:
        return <Flame size={16} color="var(--heat-extreme)" />;
    }
  };

  return (
    <section className="section section-alt" id="heat-gaps">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="demo-pill">{t.heatGaps.demoBadge}</span>
          <h2>{t.heatGaps.title}</h2>
          <p>{t.heatGaps.subtitle}</p>
        </div>

        {/* Section Layout Grid */}
        <div className="heat-gaps-layout">
          {/* Left: Reporting Form */}
          <div className="report-form-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', color: 'var(--forest-900)' }}>
              {t.heatGaps.formTitle}
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Category */}
              <div className="form-group">
                <label htmlFor="gap-category-select">{t.heatGaps.categoryLabel}</label>
                <select
                  id="gap-category-select"
                  className="city-select"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="missingShade">{t.heatGaps.categories.missingShade}</option>
                  <option value="waterUnavailable">{t.heatGaps.categories.waterUnavailable}</option>
                  <option value="unshadedBusStop">{t.heatGaps.categories.unshadedBusStop}</option>
                  <option value="extremeHeatZone">{t.heatGaps.categories.extremeHeatZone}</option>
                </select>
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="gap-location-input">{t.heatGaps.locationLabel}</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} color="var(--forest-700)" />
                  <input
                    id="gap-location-input"
                    type="text"
                    className="text-input"
                    placeholder={t.heatGaps.locationPlaceholder}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label htmlFor="gap-priority-select">{t.heatGaps.priorityLabel}</label>
                <select
                  id="gap-priority-select"
                  className="city-select"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">{t.heatGaps.priorities.low}</option>
                  <option value="medium">{t.heatGaps.priorities.medium}</option>
                  <option value="high">{t.heatGaps.priorities.high}</option>
                  <option value="critical">{t.heatGaps.priorities.critical}</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="gap-desc-input">{t.heatGaps.descLabel}</label>
                <textarea
                  id="gap-desc-input"
                  className="textarea-input"
                  placeholder={t.heatGaps.descPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent"
                style={{ width: '100%', padding: '13px' }}
                disabled={submitting}
              >
                <Send size={16} />
                <span>{submitting ? t.heatGaps.submitting : t.heatGaps.submitBtn}</span>
              </button>
            </form>
          </div>

          {/* Right: Existing Reports with Filter Controls */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--forest-900)' }}>
                {t.heatGaps.reportsHeading} ({filteredReports.length})
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Live session memory
              </span>
            </div>

            {/* Filter Pills */}
            <div className="filter-pills-row" role="tablist" aria-label="Filter heat gap reports">
              <button
                type="button"
                className={`filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                {t.heatGaps.filterAll}
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedFilter === 'missingShade' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('missingShade')}
              >
                🌿 Shade
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedFilter === 'waterUnavailable' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('waterUnavailable')}
              >
                💧 Water
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedFilter === 'unshadedBusStop' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('unshadedBusStop')}
              >
                🚌 Bus Stops
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedFilter === 'extremeHeatZone' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('extremeHeatZone')}
              >
                ☀️ Asphalt Traps
              </button>
            </div>

            {/* List of Reports */}
            {filteredReports.length === 0 ? (
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '40px 20px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                <p>{t.heatGaps.emptyState}</p>
              </div>
            ) : (
              <div className="reports-list">
                {filteredReports.map((report) => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {getCategoryIcon(report.category)}
                        <strong style={{ fontSize: '0.98rem', color: 'var(--forest-900)' }}>
                          {report.location}
                        </strong>
                      </div>
                      <span className={`priority-tag priority-${report.priority}`}>
                        {report.priority}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      {report.description}
                    </p>

                    <div className="report-actions-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} />
                          {report.timestamp}
                        </span>
                        <span style={{ color: 'var(--forest-700)', fontWeight: 600 }}>
                          {report.status}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="confirm-issue-btn"
                        onClick={() => handleConfirmIssue(report.id)}
                      >
                        <ThumbsUp size={13} />
                        <span>{report.upvotes} {confirmedReports[report.id] ? 'Confirmed' : t.heatGaps.confirmBtn}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
