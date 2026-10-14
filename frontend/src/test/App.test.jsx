import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { translations } from '../data/translations';

// Mock LeafletMap in full app test to isolate from leaflet canvas logic
vi.mock('../components/LeafletMap', () => ({
  default: () => <div data-testid="app-leaflet-map">Leaflet Map Canvas Mock</div>,
}));

describe('App Integration & Language Switching', () => {
  it('renders complete ShadeWise AI interface with all primary sections', () => {
    render(<App />);

    expect(screen.getAllByText('ShadeWise AI').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(translations.en.hero.titleRest)).toBeInTheDocument();
    expect(screen.getByText(translations.en.heatCheck.title)).toBeInTheDocument();
    expect(screen.getByText(translations.en.journey.title)).toBeInTheDocument();
    expect(screen.getByText(translations.en.companion.title)).toBeInTheDocument();
    expect(screen.getByText(translations.en.heatGaps.title)).toBeInTheDocument();
    expect(screen.getByText(translations.en.footer.builtFor)).toBeInTheDocument();
  });

  it('switches application language dynamically from English to Telugu and back', async () => {
    render(<App />);

    // Initially English
    expect(screen.getByText(translations.en.heatCheck.title)).toBeInTheDocument();

    // Click Telugu language button
    const teluguBtn = screen.getByRole('button', { name: /తెలుగు/i });
    fireEvent.click(teluguBtn);

    // Verify Telugu content is rendered
    await waitFor(() => {
      expect(screen.getByText('స్మార్ట్ హీట్ & సౌకర్య తనిఖీ')).toBeInTheDocument();
      expect(screen.getByText('జర్నీ కంఫర్ట్ ప్లానర్')).toBeInTheDocument();
      expect(screen.getByText('కమ్యూనిటీ హీట్-గ్యాప్ హబ్')).toBeInTheDocument();
    });

    // Click English button to return to English
    const englishBtn = screen.getByRole('button', { name: /switch language to english/i });
    fireEvent.click(englishBtn);

    await waitFor(() => {
      expect(screen.getByText(translations.en.heatCheck.title)).toBeInTheDocument();
    });
  });

  it('includes skip to main content accessible link', () => {
    render(<App />);
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
