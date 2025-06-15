import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './hero.module.scss'
import localTexts from '@/app/homepage.texts.json'
import { Button } from '@/components/Button/Button'

const { hero } = localTexts;

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <HomeComponentContainer className={styles.component} styleWrapper={styles.componentWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>
              {hero.title}
            </h1>
            <p className={styles.description}>
              {hero.description}
            </p>
          </div>
          <Button title={hero.cta} onClick={onCtaClick} />
        </div>
    </HomeComponentContainer>
  )
}
