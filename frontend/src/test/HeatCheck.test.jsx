import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeatCheck from '../components/HeatCheck';
import { translations } from '../data/translations';

describe('HeatCheck Component', () => {
  const t = translations.en;

  it('renders section title, subtitle, and demo badge', () => {
    const handleToast = vi.fn();
    render(<HeatCheck t={t} lang="en" onShowToast={handleToast} />);

    expect(screen.getByText(t.heatCheck.title)).toBeInTheDocument();
    expect(screen.getByText(t.heatCheck.demoBadge)).toBeInTheDocument();
    expect(screen.getByText(t.heatCheck.adviceHeading)).toBeInTheDocument();
  });

  it('displays initial thermal metrics for Hyderabad', () => {
    const handleToast = vi.fn();
    render(<HeatCheck t={t} lang="en" onShowToast={handleToast} />);

    expect(screen.getByText('38°C')).toBeInTheDocument();
    expect(screen.getByText('42°C')).toBeInTheDocument();
    expect(screen.getByText('48%')).toBeInTheDocument();
  });

  it('switches location and updates displayed temperature when selecting a new city', async () => {
    const handleToast = vi.fn();
    render(<HeatCheck t={t} lang="en" onShowToast={handleToast} />);

    const citySelect = screen.getByRole('combobox', { name: /selected city/i });
    expect(citySelect).toBeInTheDocument();

    // Select Visakhapatnam
    fireEvent.change(citySelect, { target: { value: 'visakhapatnam' } });

    await waitFor(() => {
      expect(screen.getByText('35°C')).toBeInTheDocument();
      expect(screen.getByText('44°C')).toBeInTheDocument();
    });
  });

  it('triggers refresh and calls toast notification on refresh button click', async () => {
    const handleToast = vi.fn();
    render(<HeatCheck t={t} lang="en" onShowToast={handleToast} />);

    const refreshBtn = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshBtn);

    await waitFor(() => {
      expect(handleToast).toHaveBeenCalledWith(
        expect.stringContaining('refreshed'),
        'info'
      );
    });
  });

  it('renders all four heat safety guidance cards', () => {
    const handleToast = vi.fn();
    render(<HeatCheck t={t} lang="en" onShowToast={handleToast} />);

    t.heatCheck.tips.forEach((tip) => {
      expect(screen.getByText(tip.title)).toBeInTheDocument();
      expect(screen.getByText(tip.desc)).toBeInTheDocument();
    });
  });
});
