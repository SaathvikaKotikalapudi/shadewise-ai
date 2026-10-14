import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchHeatConditions,
  calculateComfortRoutes,
  queryAiCompanion,
  getInitialReports,
} from '../services/api';
import { demoCities, initialHeatReports, aiDemoResponses } from '../data/demoData';

describe('API Service Layer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchHeatConditions', () => {
    it('fetches valid demo city data correctly', async () => {
      const data = await fetchHeatConditions('hyderabad');
      expect(data).toBeDefined();
      expect(data.id).toBe('hyderabad');
      expect(data.temp).toBe(38);
      expect(data.isDemo).toBe(true);
      expect(data.fetchedAt).toBeDefined();
    });

    it('falls back to default city if unknown city is requested', async () => {
      const data = await fetchHeatConditions('unknown-city-xyz');
      expect(data).toBeDefined();
      expect(data.id).toBe(demoCities[0].id);
      expect(data.isDemo).toBe(true);
    });

    it('returns expected thermal metrics (temp, humidity, uvIndex, heatRisk)', async () => {
      const data = await fetchHeatConditions('visakhapatnam');
      expect(data.humidity).toBeGreaterThan(0);
      expect(data.uvIndex).toBeGreaterThanOrEqual(1);
      expect(data.heatRisk).toBe('extreme');
    });
  });

  describe('calculateComfortRoutes', () => {
    it('returns calculated demonstration routes with provided origin and destination', async () => {
      const res = await calculateComfortRoutes(
        'Ameerpet Metro Gate 2',
        'Osmania General Hospital',
        'walk'
      );
      expect(res).toBeDefined();
      expect(res.origin).toBe('Ameerpet Metro Gate 2');
      expect(res.destination).toBe('Osmania General Hospital');
      expect(res.mode).toBe('walk');
      expect(res.isDemo).toBe(true);
    });
  });

  describe('queryAiCompanion', () => {
    it('returns water and hydration advice when prompt mentions hydration or water', async () => {
      const reply = await queryAiCompanion('How much water should I drink?');
      expect(reply).toBe(aiDemoResponses.water);
    });

    it('returns humidity guidance when prompt mentions humidity or sweat', async () => {
      const reply = await queryAiCompanion('Why does humidity make the heat worse?');
      expect(reply).toBe(aiDemoResponses.humidity);
    });

    it('returns heat exhaustion symptoms when prompt mentions exhaustion or stroke', async () => {
      const reply = await queryAiCompanion('What are the warning signs of heat stroke?');
      expect(reply).toBe(aiDemoResponses.exhaustion);
    });

    it('returns tree canopy and shade benefits when prompt mentions shade or trees', async () => {
      const reply = await queryAiCompanion('How does tree shade reduce temperature?');
      expect(reply).toBe(aiDemoResponses.shade);
    });

    it('returns Telugu guidance when language is te or contains Telugu characters', async () => {
      const reply = await queryAiCompanion('ఎండ జాగ్రత్తలు ఏమిటి?', 'te');
      expect(reply).toBe(aiDemoResponses.telugu);
    });

    it('returns default practical guidance for general queries', async () => {
      const reply = await queryAiCompanion('Hello ShadeWise assistant');
      expect(reply).toBe(aiDemoResponses.default);
    });
  });

  describe('getInitialReports', () => {
    it('returns seeded community heat-gap reports', () => {
      const reports = getInitialReports();
      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeGreaterThan(0);
      expect(reports[0]).toHaveProperty('id');
      expect(reports[0]).toHaveProperty('category');
      expect(reports[0]).toHaveProperty('location');
      expect(reports[0]).toHaveProperty('priority');
    });
  });
});
