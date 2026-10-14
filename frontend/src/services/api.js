/**
 * ShadeWise AI - API Service Layer
 * 
 * Configured for seamless transition from prototype demo mode
 * to the Phase 2 Node.js/Express backend, Open-Meteo weather service,
 * and Gemini AI companion integration.
 */

import { demoCities, initialHeatReports, aiDemoResponses } from '../data/demoData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENABLE_LIVE_WEATHER = import.meta.env.VITE_ENABLE_LIVE_WEATHER === 'true';
const ENABLE_LIVE_ROUTING = import.meta.env.VITE_ENABLE_LIVE_ROUTING === 'true';
const ENABLE_GEMINI_AI = import.meta.env.VITE_ENABLE_GEMINI_AI === 'true';

/**
 * Fetch weather conditions for a chosen city.
 * In Phase 2: calls Open-Meteo / backend proxy.
 */
export async function fetchHeatConditions(cityId) {
  if (ENABLE_LIVE_WEATHER) {
    try {
      const res = await fetch(`${API_BASE_URL}/weather?city=${cityId}`);
      if (!res.ok) throw new Error('Live weather service unavailable');
      return await res.json();
    } catch (err) {
      console.warn('Falling back to local demo profile:', err);
    }
  }

  // Simulated latency for realistic prototype interaction
  await new Promise((resolve) => setTimeout(resolve, 350));
  const city = demoCities.find((c) => c.id === cityId) || demoCities[0];
  return {
    ...city,
    isDemo: true,
    fetchedAt: new Date().toLocaleTimeString(),
  };
}

/**
 * Calculate journey comfort routes.
 * In Phase 2: calls backend routing engine (OSRM/OpenTripPlanner + canopy layers).
 */
export async function calculateComfortRoutes(origin, destination, mode = 'walk') {
  if (ENABLE_LIVE_ROUTING) {
    try {
      const res = await fetch(`${API_BASE_URL}/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, mode }),
      });
      if (!res.ok) throw new Error('Live route calculation unavailable');
      return await res.json();
    } catch (err) {
      console.warn('Falling back to prototype route models:', err);
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 550));
  return {
    isDemo: true,
    origin,
    destination,
    mode,
  };
}

/**
 * Query the AI Companion.
 * In Phase 2: calls backend Gemini API proxy endpoint (/api/chat).
 */
export async function queryAiCompanion(prompt, lang = 'en') {
  if (ENABLE_GEMINI_AI) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, language: lang }),
      });
      if (!res.ok) throw new Error('Live AI service unavailable');
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.warn('Falling back to prototype AI responses:', err);
    }
  }

  // Prototype keyword-aware response engine
  await new Promise((resolve) => setTimeout(resolve, 600));
  const lower = prompt.toLowerCase();

  if (lang === 'te' || /[\u0C00-\u0C7F]/.test(prompt)) {
    return aiDemoResponses.telugu;
  }

  // Strip brand name so "shadewise" doesn't falsely trigger the "shade" category
  const queryWithoutBrand = lower.replace(/shadewise(?:\s*ai)?/g, '');

  if (queryWithoutBrand.includes('water') || queryWithoutBrand.includes('hydrate') || queryWithoutBrand.includes('drink')) {
    return aiDemoResponses.water;
  }
  if (queryWithoutBrand.includes('humidity') || queryWithoutBrand.includes('sweat') || queryWithoutBrand.includes('wet')) {
    return aiDemoResponses.humidity;
  }
  if (queryWithoutBrand.includes('exhaustion') || queryWithoutBrand.includes('stroke') || queryWithoutBrand.includes('symptom') || queryWithoutBrand.includes('sign')) {
    return aiDemoResponses.exhaustion;
  }
  if (queryWithoutBrand.includes('shade') || queryWithoutBrand.includes('tree') || queryWithoutBrand.includes('canopy') || queryWithoutBrand.includes('cool')) {
    return aiDemoResponses.shade;
  }
  if (queryWithoutBrand.includes('pack') || queryWithoutBrand.includes('carry') || queryWithoutBrand.includes('wear') || queryWithoutBrand.includes('cloth')) {
    return aiDemoResponses.pack;
  }

  return aiDemoResponses.default;
}

/**
 * Community heat gap storage helpers (frontend local state + fallback).
 */
export function getInitialReports() {
  return initialHeatReports;
}
