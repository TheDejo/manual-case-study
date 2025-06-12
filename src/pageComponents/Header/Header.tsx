import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './header.module.scss'
import { Logo } from '@/components/Logo/Logo'

export default function Header() {
  return (
    <HomeComponentContainer className={styles.component} styleWrapper={styles.componentWrapper}>
      <header>
        <nav>
          <Logo />
        </nav>
      </header>
    </HomeComponentContainer>
  )
}
