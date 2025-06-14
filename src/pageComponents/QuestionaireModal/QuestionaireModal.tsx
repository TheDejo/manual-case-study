import React, { useEffect, useState } from 'react'
import styles from './questionaireModal.module.scss'
import cx from 'classnames'
import { useLockBodyScroll } from '@/utils/hooks/useLockBodyScroll';
import useGetQuestions from '@/utils/hooks/useGetQuestions';
import { Button } from '@/components/Button/Button';
import { VARIANTS } from '@/utils/types';
import { X } from 'lucide-react';
import { constants } from '@/config/constants';
import Result from '../Result/Result';
import localTexts from '@/app/homepage.texts.json';

const { COMPANY_LINKS } = constants;
const { questionnaire } = localTexts;

interface QuestionaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Answer {
  questionIndex: number;
  selectedOption: number;
  value: any;
  isRejection: boolean;
}

export default function QuestionaireModal({ 
  isOpen, 
  onClose,
}: QuestionaireModalProps) {
  
  useLockBodyScroll(isOpen);
  const { data, isLoading } = useGetQuestions(isOpen);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hasRejection, setHasRejection] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowResults(false);
      setHasRejection(false);
    }
  }, [isOpen]);

  const questions = data?.data.questions || [];

  const handleAnswerSelect = (optionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];
    
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionIndex === currentQuestionIndex);
    
    const newAnswer: Answer = {
      questionIndex: currentQuestionIndex,
      selectedOption: optionIndex,
      value: selectedOption.value,
      isRejection: selectedOption.isRejection
    };

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }

    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer) return;

    if (currentAnswer.isRejection) {
      setHasRejection(true);
      setShowResults(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionIndex === currentQuestionIndex);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.loading}>{questionnaire.loading}</div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{questionnaire.resultsTitle}</h2>
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <X />
            </button>
          </div>
          <div className={styles.modalContent}>
            <Result hasRejection={hasRejection} onClose={onClose} />
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = getCurrentAnswer();

  return (
    <div className={styles.modalContainer} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {questionnaire.questionTitle
              .replace('{current}', (currentQuestionIndex + 1).toString())
              .replace('{total}', questions.length.toString())
            }
          </h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.questionContainer}>
            <h3 className={styles.questionText}>{currentQuestion?.question}</h3>
            
            <div className={styles.optionsContainer}>
              {currentQuestion?.options.map((option: any, index: number) => (
                <button
                  key={index}
                  className={cx(
                    styles.optionButton,
                    {
                      [styles.selected]: currentAnswer?.selectedOption === index,
                    }
                  )}
                  onClick={() => handleAnswerSelect(index)}
                  dangerouslySetInnerHTML={{ __html: option.display }}
                />
              ))}
            </div>

            <div className={styles.navigation}>
              {currentQuestionIndex > 0 && (
                <Button 
                  title={questionnaire.navigation.previous}
                  onClick={handlePreviousQuestion}
                  variant={VARIANTS.SECONDARY}
                />
              )}
              <Button 
                title={questionnaire.navigation.next}
                onClick={handleNextQuestion}
                disabled={!currentAnswer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
