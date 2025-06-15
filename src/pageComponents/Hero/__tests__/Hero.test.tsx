import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '../Hero'
import userEvent from '@testing-library/user-event';
import localTexts from '@/app/homepage.texts.json'

const { hero } = localTexts;

const renderComponent = ({ onCtaClick = jest.fn() }: { onCtaClick?: () => void } = {}) => {
  const user = userEvent.setup();
  const result = render(<Hero onCtaClick={onCtaClick} />)
  return { result, user }
}

describe('Hero', () => {
  const mockOnCtaClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders hero section with all content', () => {
      renderComponent({ onCtaClick: mockOnCtaClick });
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(hero.title)).toBeInTheDocument();
      expect(screen.getByText(hero.description)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: hero.cta })).toBeInTheDocument();
    });
  });

  describe('Modal Integration', () => {
    test('opens modal when CTA button is clicked', async () => {
      const { user } = renderComponent({ onCtaClick: mockOnCtaClick });
      
      const ctaButton = screen.getByRole('button', { name: hero.cta });
      await user.click(ctaButton);
      
      expect(mockOnCtaClick).toHaveBeenCalledTimes(1);
    });
  });
}); 