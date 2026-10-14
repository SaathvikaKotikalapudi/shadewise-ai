import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JourneyPlanner from '../components/JourneyPlanner';
import { translations } from '../data/translations';

// Mock child LeafletMap to isolate JourneyPlanner state and DOM tests
vi.mock('../components/LeafletMap', () => ({
  default: () => <div data-testid="leaflet-map-mock">Mock Leaflet Map Canvas</div>,
}));

describe('JourneyPlanner Component', () => {
  const t = translations.en;

  it('renders journey planner heading, inputs, and mock map container', () => {
    const handleToast = vi.fn();
    render(<JourneyPlanner t={t} onShowToast={handleToast} />);

    expect(screen.getByText(t.journey.title)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(t.journey.originPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(t.journey.destinationPlaceholder)).toBeInTheDocument();
    expect(screen.getByTestId('leaflet-map-mock')).toBeInTheDocument();
  });

  it('swaps origin and destination when swap button is clicked', () => {
    const handleToast = vi.fn();
    render(<JourneyPlanner t={t} onShowToast={handleToast} />);

    const originInput = screen.getByPlaceholderText(t.journey.originPlaceholder);
    const destInput = screen.getByPlaceholderText(t.journey.destinationPlaceholder);
    const swapBtn = screen.getByRole('button', { name: t.journey.swapBtnTitle });

    const initialOrigin = originInput.value;
    const initialDest = destInput.value;

    fireEvent.click(swapBtn);

    expect(originInput.value).toBe(initialDest);
    expect(destInput.value).toBe(initialOrigin);
    expect(handleToast).toHaveBeenCalledWith('Origin and destination swapped.', 'info');
  });

  it('loads sample journey presets when quick-route chip is clicked', () => {
    const handleToast = vi.fn();
    render(<JourneyPlanner t={t} onShowToast={handleToast} />);

    const firstSample = t.journey.quickRoutes[0];
    const sampleBtn = screen.getByText(firstSample.name);

    fireEvent.click(sampleBtn);

    const originInput = screen.getByPlaceholderText(t.journey.originPlaceholder);
    const destInput = screen.getByPlaceholderText(t.journey.destinationPlaceholder);

    expect(originInput.value).toBe(firstSample.from);
    expect(destInput.value).toBe(firstSample.to);
    expect(handleToast).toHaveBeenCalledWith(
      expect.stringContaining(firstSample.name),
      'info'
    );
  });

  it('shows error toast when attempting to submit with empty origin or destination', () => {
    const handleToast = vi.fn();
    render(<JourneyPlanner t={t} onShowToast={handleToast} />);

    const originInput = screen.getByPlaceholderText(t.journey.originPlaceholder);
    const destInput = screen.getByPlaceholderText(t.journey.destinationPlaceholder);
    const submitBtn = screen.getByRole('button', { name: t.journey.findBtn });

    fireEvent.change(originInput, { target: { value: '   ' } });
    fireEvent.change(destInput, { target: { value: '' } });

    fireEvent.submit(submitBtn.closest('form'));

    expect(handleToast).toHaveBeenCalledWith(
      expect.stringContaining('both starting point and destination'),
      'error'
    );
  });

  it('displays three route comparison options and allows selecting a route', () => {
    const handleToast = vi.fn();
    render(<JourneyPlanner t={t} onShowToast={handleToast} />);

    expect(screen.getByText(t.journey.routes.recommended.title)).toBeInTheDocument();
    expect(screen.getByText(t.journey.routes.fastest.title)).toBeInTheDocument();
    expect(screen.getByText(t.journey.routes.transit.title)).toBeInTheDocument();

    const selectButtons = screen.getAllByRole('button', { name: new RegExp(t.journey.selectRouteBtn, 'i') });
    expect(selectButtons.length).toBeGreaterThanOrEqual(1);

    // Select fastest route
    fireEvent.click(selectButtons[1]);

    expect(handleToast).toHaveBeenCalledWith(t.journey.selectedRouteSuccess, 'success');
  });
});
