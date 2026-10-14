import { describe, it, expect } from 'vitest';
import { translations } from '../data/translations';

describe('Bilingual Translation Integrity', () => {
  it('contains English and Telugu dictionaries', () => {
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('te');
  });

  it('contains all required top-level modules in both languages', () => {
    const modules = ['nav', 'hero', 'heatCheck', 'journey', 'companion', 'heatGaps', 'footer', 'common'];
    modules.forEach((mod) => {
      expect(translations.en).toHaveProperty(mod);
      expect(translations.te).toHaveProperty(mod);
    });
  });

  it('has valid navigation labels in both languages', () => {
    expect(translations.en.nav.brand).toBe('ShadeWise AI');
    expect(translations.te.nav.brand).toBe('షేడ్‌వైజ్ AI');
    expect(translations.en.nav.quickPlanBtn.length).toBeGreaterThan(0);
    expect(translations.te.nav.quickPlanBtn.length).toBeGreaterThan(0);
  });

  it('has four practical heat-safety advice tips in both languages', () => {
    expect(translations.en.heatCheck.tips.length).toBe(4);
    expect(translations.te.heatCheck.tips.length).toBe(4);
    translations.en.heatCheck.tips.forEach((tip) => {
      expect(tip.title.length).toBeGreaterThan(0);
      expect(tip.desc.length).toBeGreaterThan(0);
    });
    translations.te.heatCheck.tips.forEach((tip) => {
      expect(tip.title.length).toBeGreaterThan(0);
      expect(tip.desc.length).toBeGreaterThan(0);
    });
  });

  it('defines distinct heat-risk levels in both languages', () => {
    const levels = ['low', 'moderate', 'high', 'extreme'];
    levels.forEach((lvl) => {
      expect(translations.en.heatCheck.heatRiskLevels).toHaveProperty(lvl);
      expect(translations.te.heatCheck.heatRiskLevels).toHaveProperty(lvl);
    });
  });

  it('contains route option descriptions in both languages', () => {
    const routes = ['recommended', 'fastest', 'transit'];
    routes.forEach((r) => {
      expect(translations.en.journey.routes).toHaveProperty(r);
      expect(translations.te.journey.routes).toHaveProperty(r);
    });
  });
});
