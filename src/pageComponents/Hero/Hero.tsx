import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './hero.module.scss'
import Link from 'next/link'
import { constants } from '@/config/constants'
import localTexts from '@/app/homepage.texts.json'

const { CLIENT_ROUTES } = constants;
const { hero } = localTexts;

export default function Hero() {
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
          <Link href={CLIENT_ROUTES.quiz} className={styles.link}>
            {hero.cta}
          </Link>
        </div>
    </HomeComponentContainer>
  )
}
