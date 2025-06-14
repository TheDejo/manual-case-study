import { Button } from '@/components/Button/Button';
import { constants } from '@/config/constants';
import { VARIANTS } from '@/utils/types'
import React from 'react'
import styles from './result.module.scss';
import localTexts from '@/app/homepage.texts.json';

const { COMPANY_LINKS } = constants;
const { results } = localTexts;

interface ResultProps {
  hasRejection: boolean;
  onClose: () => void;
}

export default function Result({ hasRejection, onClose }: ResultProps) {
  return (
      <div className={styles.results}>
          {hasRejection ? (
              <div className={styles.rejectionResult}>
                  <h3>{results.rejection.title}</h3>
                  <p>{results.rejection.description}</p>
              </div>
          ) : (
              <div className={styles.successResult}>
                  <h3>{results.success.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: results.success.description.replace(
                        '{manualLink}', 
                        `<a href="${COMPANY_LINKS.manual}" target="_blank" rel="noopener noreferrer">www.manual.co</a>`
                      )
                    }}
                  />
              </div>
          )}
          <Button
              title={results.closeButton}
              onClick={onClose}
              variant={VARIANTS.SECONDARY}
          />
      </div>
  )
}
