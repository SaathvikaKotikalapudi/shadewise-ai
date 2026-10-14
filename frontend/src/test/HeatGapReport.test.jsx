import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeatGapReport from '../components/HeatGapReport';
import { translations } from '../data/translations';
import { initialHeatReports } from '../data/demoData';

describe('HeatGapReport Component', () => {
  const t = translations.en;

  it('renders report form, headings, and seeded community reports', () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    expect(screen.getByText(t.heatGaps.title)).toBeInTheDocument();
    expect(screen.getByText(t.heatGaps.formTitle)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(t.heatGaps.locationPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(t.heatGaps.descPlaceholder)).toBeInTheDocument();

    // Verify first seeded report location is present
    expect(screen.getByText(initialHeatReports[0].location)).toBeInTheDocument();
  });

  it('shows error toast when submitting with empty location or description', () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    const submitBtn = screen.getByRole('button', { name: t.heatGaps.submitBtn });
    fireEvent.submit(submitBtn.closest('form'));

    expect(handleToast).toHaveBeenCalledWith(t.heatGaps.validationError, 'error');
  });

  it('shows error toast when location is shorter than 3 characters', () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    const locInput = screen.getByPlaceholderText(t.heatGaps.locationPlaceholder);
    const descInput = screen.getByPlaceholderText(t.heatGaps.descPlaceholder);
    const submitBtn = screen.getByRole('button', { name: t.heatGaps.submitBtn });

    fireEvent.change(locInput, { target: { value: 'ab' } });
    fireEvent.change(descInput, { target: { value: 'Valid detailed heat issue description' } });
    fireEvent.submit(submitBtn.closest('form'));

    expect(handleToast).toHaveBeenCalledWith(
      expect.stringContaining('at least 3 characters'),
      'error'
    );
  });

  it('adds a new report to the local frontend state list upon valid submission', async () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    const locInput = screen.getByPlaceholderText(t.heatGaps.locationPlaceholder);
    const descInput = screen.getByPlaceholderText(t.heatGaps.descPlaceholder);
    const submitBtn = screen.getByRole('button', { name: t.heatGaps.submitBtn });

    fireEvent.change(locInput, { target: { value: 'Dilsukhnagar Bus Terminal Platform 2' } });
    fireEvent.change(descInput, { target: { value: 'Completely unshaded passenger waiting bay with intense afternoon heat' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Dilsukhnagar Bus Terminal Platform 2')).toBeInTheDocument();
      expect(handleToast).toHaveBeenCalledWith(t.heatGaps.formSuccess, 'success');
    }, { timeout: 1500 });
  });

  it('filters reports when filter pills are clicked', () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    const shadeFilter = screen.getByRole('tab', { name: /shade/i });
    fireEvent.click(shadeFilter);

    // Initial report 0 is missingShade
    expect(screen.getByText(initialHeatReports[0].location)).toBeInTheDocument();

    // Initial report 1 is waterUnavailable; should be filtered out under Shade tab
    expect(screen.queryByText(initialHeatReports[1].location)).not.toBeInTheDocument();
  });

  it('increments vote confirmation count on confirm button click', () => {
    const handleToast = vi.fn();
    render(<HeatGapReport t={t} onShowToast={handleToast} />);

    const firstReport = initialHeatReports[0];
    const initialUpvotes = firstReport.upvotes;

    const confirmBtns = screen.getAllByRole('button', { name: /confirm issue/i });
    fireEvent.click(confirmBtns[0]);

    expect(screen.getByText(new RegExp(`${initialUpvotes + 1}`, 'i'))).toBeInTheDocument();
    expect(handleToast).toHaveBeenCalledWith(
      expect.stringContaining('Issue confirmed!'),
      'success'
    );
  });
});
