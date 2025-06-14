import React, { useEffect } from 'react'
import styles from './questionaireModal.module.scss'
import cx from 'classnames'
import { useLockBodyScroll } from '@/utils/hooks/useLockBodyScroll';
import useGetQuestions from '@/utils/hooks/useGetQuestions';

interface QuestionaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionaireModal({ 
  isOpen, 
  onClose,
}: QuestionaireModalProps) {
  
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
    const { data, isLoading } = useGetQuestions(isOpen);


  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} onClick={handleBackdropClick}>
      <div className={cx(styles.modal)}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Title
          </h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>
          some text
        </div>
      </div>
    </div>
  );
}
