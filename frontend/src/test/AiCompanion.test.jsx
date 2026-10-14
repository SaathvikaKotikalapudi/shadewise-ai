import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AiCompanion from '../components/AiCompanion';
import { translations } from '../data/translations';
import { aiDemoResponses } from '../data/demoData';

describe('AiCompanion Component', () => {
  const t = translations.en;

  it('renders companion title, welcome message, and suggested presets', () => {
    const handleToast = vi.fn();
    render(<AiCompanion t={t} lang="en" onShowToast={handleToast} />);

    expect(screen.getByText(t.companion.title)).toBeInTheDocument();
    expect(screen.getByText(t.companion.defaultWelcome)).toBeInTheDocument();
    expect(screen.getByText(t.companion.suggestedHeading)).toBeInTheDocument();

    t.companion.presetQuestions.forEach((q) => {
      expect(screen.getByText(`"${q}"`)).toBeInTheDocument();
    });
  });

  it('disables the send button when the input is empty', () => {
    const handleToast = vi.fn();
    render(<AiCompanion t={t} lang="en" onShowToast={handleToast} />);

    const sendBtn = screen.getByRole('button', { name: t.companion.sendBtn });
    expect(sendBtn).toBeDisabled();
  });

  it('handles clicking a preset question and displays the simulated AI response', async () => {
    const handleToast = vi.fn();
    render(<AiCompanion t={t} lang="en" onShowToast={handleToast} />);

    const firstPreset = screen.getByText(`"${t.companion.presetQuestions[0]}"`);
    fireEvent.click(firstPreset);

    // Should display the user question in the chat
    expect(screen.getByText(t.companion.presetQuestions[0])).toBeInTheDocument();

    // Should receive simulated AI answer
    await waitFor(
      () => {
        expect(screen.getByText(aiDemoResponses.pack)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('allows typing a custom question and receiving water guidance', async () => {
    const handleToast = vi.fn();
    render(<AiCompanion t={t} lang="en" onShowToast={handleToast} />);

    const input = screen.getByPlaceholderText(t.companion.inputPlaceholder);
    const sendBtn = screen.getByRole('button', { name: t.companion.sendBtn });

    fireEvent.change(input, { target: { value: 'How much water should I drink in this heat?' } });
    expect(sendBtn).not.toBeDisabled();

    fireEvent.click(sendBtn);

    expect(screen.getByText('How much water should I drink in this heat?')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(aiDemoResponses.water)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
