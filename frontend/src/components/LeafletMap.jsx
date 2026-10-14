import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sampleMapData } from '../data/demoData';

export default function LeafletMap({ activeRoute = 'recommended', t }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayersRef = useRef({});

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Clean up any existing map instance before creating a new one
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (err) {
        console.warn('Leaflet cleanup warning:', err);
      }
      mapInstanceRef.current = null;
    }

    // Ensure the DOM container does not retain a stale Leaflet instance ID
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    // Initialize Leaflet map instance centered on sample coordinates
    const map = L.map(container, {
      center: sampleMapData.center,
      zoom: sampleMapData.zoom,
      zoomControl: true,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom modern SVG-based DivIcons to avoid asset-loading path issues
    const originIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background:#1B4332;color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.3);border:2px solid #fff;font-size:16px;">
          🟢
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    const destIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background:#E76F51;color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.3);border:2px solid #fff;font-size:16px;">
          🏁
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    const waterIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background:#0284C7;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid #fff;font-size:14px;">
          💧
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const shelterIcon = L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="background:#2D6A4F;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid #fff;font-size:14px;">
          🌿
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add Start and End Markers
    L.marker([sampleMapData.startPoint.lat, sampleMapData.startPoint.lng], { icon: originIcon })
      .addTo(map)
      .bindPopup(`<strong>${sampleMapData.startPoint.title}</strong><br/>Pedestrian journey start.`);

    L.marker([sampleMapData.endPoint.lat, sampleMapData.endPoint.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<strong>${sampleMapData.endPoint.title}</strong><br/>Destination.`);

    // Add Drinking Water Waypoint Markers
    sampleMapData.waterStations.forEach((ws) => {
      L.marker([ws.lat, ws.lng], { icon: waterIcon })
        .addTo(map)
        .bindPopup(`<strong>💧 Verified Hydration Point</strong><br/>${ws.name}`);
    });

    // Add Tree Canopy Waypoints
    sampleMapData.treeCanopyShelters.forEach((ts) => {
      L.marker([ts.lat, ts.lng], { icon: shelterIcon })
        .addTo(map)
        .bindPopup(`<strong>🌿 Dense Shade Canopy</strong><br/>${ts.name}`);
    });

    // Shaded Route Polyline (Forest Green)
    const shadedPolyline = L.polyline(sampleMapData.shadedRouteCoords, {
      color: '#2D6A4F',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
    }).addTo(map);
    shadedPolyline.bindPopup(
      '<strong>🌿 ShadeWise Cooler Path (82% Shade)</strong><br/>Follows tree-lined avenues and park walkways.'
    );

    // Direct Exposed Route Polyline (Amber Orange, dashed)
    const exposedPolyline = L.polyline(sampleMapData.exposedRouteCoords, {
      color: '#E76F51',
      weight: 4,
      dashArray: '6, 8',
      opacity: 0.75,
      lineCap: 'round',
    }).addTo(map);
    exposedPolyline.bindPopup(
      '<strong>☀️ Direct Asphalt Route (22% Shade)</strong><br/>Fastest distance, but heavy direct solar exposure.'
    );

    routeLayersRef.current = {
      recommended: shadedPolyline,
      fastest: exposedPolyline,
    };

    // Fit bounds to show entire demonstration route
    const group = L.featureGroup([shadedPolyline, exposedPolyline]);
    map.fitBounds(group.getBounds().pad(0.12));

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (err) {
          console.warn('Leaflet cleanup on unmount warning:', err);
        }
        mapInstanceRef.current = null;
      }
      if (container && container._leaflet_id) {
        delete container._leaflet_id;
      }
    };
  }, []);

  // Update route emphasis dynamically when activeRoute changes
  useEffect(() => {
    const layers = routeLayersRef.current;
    if (!layers || !layers.recommended || !layers.fastest) return;

    if (activeRoute === 'recommended') {
      layers.recommended.setStyle({ opacity: 0.95, weight: 7 });
      layers.fastest.setStyle({ opacity: 0.45, weight: 3 });
      layers.recommended.bringToFront();
    } else if (activeRoute === 'fastest') {
      layers.recommended.setStyle({ opacity: 0.45, weight: 3 });
      layers.fastest.setStyle({ opacity: 0.95, weight: 6 });
      layers.fastest.bringToFront();
    } else {
      layers.recommended.setStyle({ opacity: 0.85, weight: 5 });
      layers.fastest.setStyle({ opacity: 0.5, weight: 4 });
    }
  }, [activeRoute]);

  return (
    <div className="map-container-wrap">
      <div className="map-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="demo-pill forest" style={{ marginBottom: 0 }}>
            {t.journey.demoBadge}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Hyderabad Urban Corridor (OSM Live Tiles)
          </span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Zoom & pan enabled • Click markers for details
        </span>
      </div>

      {/* Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="leaflet-map-host" />

      {/* Map Legend Bar */}
      <div className="map-legend-bar">
        <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
          {t.journey.mapLegend.title}:
        </span>
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: '#2D6A4F' }} />
          <span>{t.journey.mapLegend.shadedPath}</span>
        </div>
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: '#E76F51', border: '1px dashed #B02A37' }} />
          <span>{t.journey.mapLegend.exposedPath}</span>
        </div>
        <div className="legend-item">
          <span style={{ fontSize: '13px' }}>💧</span>
          <span>{t.journey.mapLegend.waterPoint}</span>
        </div>
        <div className="legend-item">
          <span style={{ fontSize: '13px' }}>🌿</span>
          <span>{t.journey.mapLegend.shadePoint}</span>
        </div>
      </div>
    </div>
  );
}
