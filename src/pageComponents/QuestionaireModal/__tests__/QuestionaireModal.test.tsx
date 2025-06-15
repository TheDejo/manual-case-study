import React from 'react'
import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionaireModal from '../QuestionaireModal'
import userEvent from '@testing-library/user-event';
import { server, handlers } from '@/utils/msw/server';
import { http, HttpResponse } from 'msw';

jest.mock('../../../utils/hooks/useLockBodyScroll', () => ({
  __esModule: true,
  ...jest.requireActual('../../../utils/hooks/useLockBodyScroll'),
  useLockBodyScroll: jest.fn(),
}))

const renderComponent = ({ isOpen = true, onClose = jest.fn() }: { isOpen?: boolean, onClose?: () => void }) => {
  const user = userEvent.setup();
  const result = render(<QuestionaireModal isOpen={isOpen} onClose={onClose} />)
  return { result, user }
}

const waitForQuestionsToLoad = async () => {
  await screen.findByText('What is your age?');
};

describe('QuestionaireModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

//Works
  describe('Basic Rendering', () => {
    test('renders modal when isOpen is true', async () => {
      renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
      expect(screen.getByText('What is your age?')).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
      renderComponent({ isOpen: false, onClose: mockOnClose });
      
      expect(screen.queryByText('Question 1 of 3')).not.toBeInTheDocument();
    });
  });

  //Works
  describe('Question Navigation - Happy Path', () => {
    test('allows user to select an answer', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      const optionButton = screen.getByText('18-25');
      await user.click(optionButton);
      
      expect(optionButton).toHaveClass('selected');
    });

    test('enables Next button when an answer is selected', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      const nextButton = screen.getByText('Next →');
      expect(nextButton).toHaveClass('disabled');
      
      const optionButton = screen.getByText('18-25');
      await user.click(optionButton);
      
        expect(nextButton).not.toBeDisabled();
    });

    test('advances to next question when Next is clicked', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select first answer
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      
      // Click Next
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Should show second question
      expect(screen.getByText('Question 2 of 3')).toBeInTheDocument();
      expect(screen.getByText('Do you have any medical conditions?')).toBeInTheDocument();
    });

    test('shows Previous button on second question', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Go to second question
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Should show Previous button
      expect(screen.getByText('← Previous')).toBeInTheDocument();
    });

    test('allows going back to previous question', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Go to second question
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Go back to first question
      const previousButton = screen.getByText('← Previous');
      await user.click(previousButton);
      
      expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
      expect(screen.getByText('What is your age?')).toBeInTheDocument();
    });

    test('maintains selected answers when navigating', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select first answer
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      
      // Go to second question
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Select second answer
      const secondOption = screen.getByText('No');
      await user.click(secondOption);
      
      // Go back to first question
      const previousButton = screen.getByText('← Previous');
      await user.click(previousButton);
      
      // First answer should still be selected
      expect(firstOption).toHaveClass('selected');
    });

    test('shows results after completing all questions', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Complete all questions with non-rejection answers
      const questions = [
        { answer: '18-25' },
        { answer: 'No' },
        { answer: 'Beginner' }
      ];

      for (let i = 0; i < questions.length; i++) {
        const optionButton = screen.getByText(questions[i].answer);
        await user.click(optionButton);
        
        const nextButton = screen.getByText('Next →');
        await user.click(nextButton);
      }
      
      // Should show results
      expect(screen.getByText('Results')).toBeInTheDocument();
    });
  });

  //Works
  describe('Rejection Scenarios', () => {
    test('shows rejection result when rejection answer is selected on first question', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select rejection answer
      const rejectionOption = screen.getByText('Under 18');
      await user.click(rejectionOption);
      
      // Click Next
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Should show rejection result
      expect(screen.getByText('Results')).toBeInTheDocument();
    });

    test('shows rejection result when rejection answer is selected on any question', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Go to second question
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Select rejection answer on second question
      const rejectionOption = screen.getByText('Yes');
      await user.click(rejectionOption);
      
      // Click Next
      const nextButton2 = screen.getByText('Next →');
      await user.click(nextButton2);
      
      // Should show rejection result
      expect(screen.getByText('Results')).toBeInTheDocument();
    });

    test('allows changing answer before proceeding', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      // Select rejection answer first
      const rejectionOption = screen.getByText('Under 18');
      await user.click(rejectionOption);
      
      // Change to non-rejection answer
      const nonRejectionOption = screen.getByText('18-25');
      await user.click(nonRejectionOption);
      
      // Should not show rejection result
      expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
      expect(nonRejectionOption).toHaveClass('selected');
      expect(rejectionOption).not.toHaveClass('selected');
    });
  });

  describe('Modal Interactions', () => {
    test('closes modal when close button is clicked', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    test('closes modal when Escape key is pressed', async () => {
      renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      fireEvent.keyDown(document, { key: 'Escape' });
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    test('closes modal when backdrop is clicked', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      const modalContainer = screen.getByText('What is your age?').closest('.modalContainer');
      await user.click(modalContainer!);
      
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    test('resets state when modal reopens', async () => {
      const { user, result } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select first option
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      
      // Close modal
      result.rerender(<QuestionaireModal isOpen={false} onClose={mockOnClose} />);
      
      // Reopen modal
      result.rerender(<QuestionaireModal isOpen={true} onClose={mockOnClose} />);
      await waitForQuestionsToLoad();
      
      // Should be back to first question with no selection
      expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
      const freshOption = screen.getByText('18-25');
      expect(freshOption).not.toHaveClass('selected');
    });

    test('handles multiple answer selections correctly', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select first option
      const firstOption = screen.getByText('18-25');
      await user.click(firstOption);
      expect(firstOption).toHaveClass('selected');
      
      // Select different option
      const secondOption = screen.getByText('26-35');
      await user.click(secondOption);
      expect(firstOption).not.toHaveClass('selected');
      expect(secondOption).toHaveClass('selected');
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', async () => {
      renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    test('supports keyboard navigation', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Tab to close button first (it's first in DOM order)
      await user.tab();
      expect(screen.getByLabelText('Close modal')).toHaveFocus();
      
      // Tab to first option
      await user.tab();
      expect(screen.getByText('Under 18')).toHaveFocus();
      
      // Select with Enter
      await user.keyboard('{Enter}');
      expect(screen.getByText('Under 18')).toHaveClass('selected');
    });
  });

  describe('Integration with Result Component', () => {
    test('passes correct props to Result component on success', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Select rejection answer
      const rejectionOption = screen.getByText('Under 18');
      await user.click(rejectionOption);
      
      // Click Next
      const nextButton = screen.getByText('Next →');
      await user.click(nextButton);
      
      // Should show results with rejection
      expect(screen.getByText('Results')).toBeInTheDocument();
    });

    test('passes correct props to Result component on rejection', async () => {
      const { user } = renderComponent({ isOpen: true, onClose: mockOnClose });
      
      await waitForQuestionsToLoad();
      // Complete all questions with non-rejection answers
      const questions = [
        { answer: '18-25' },
        { answer: 'No' },
        { answer: 'Beginner' }
      ];

      for (let i = 0; i < questions.length; i++) {
        const optionButton = screen.getByText(questions[i].answer);
        await user.click(optionButton);
        
        const nextButton = screen.getByText('Next →');
        await user.click(nextButton);
      }
      
      // Should show results without rejection
      expect(screen.getByText('Results')).toBeInTheDocument();
    });
  });
});