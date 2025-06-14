import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './services.module.scss'
import ServiceCard from './subComponents/ServiceCard'
import erectionsImage from '@/assets/images/homepage/erecetile-dysfunction.png'
import erectionsImage2 from '@/assets/images/homepage/number-two.png'
import hairLossImage from '@/assets/images/homepage/hair-loss.png'
import hairLossImage2 from '@/assets/images/homepage/number-one.png'
import localTexts from '@/app/homepage.texts.json'

const { services } = localTexts;

export default function Services() {
  return (
    <HomeComponentContainer className={styles.component}>
        <div>
          <h3 className={styles.servicesTitle}>
            {services.title}
          </h3>
          <div className={styles.servicesCards}>
            {services.cards.map((card, index) => (
              <ServiceCard
                key={index}
                tag={card.tag}
                description={card.description}
                title={card.title}
                serviceNumber={card.serviceNumber}
                mainImage={card.serviceNumber === 1 ? hairLossImage : erectionsImage}
                secondaryImage={card.serviceNumber === 1 ? hairLossImage2 : erectionsImage2}
              />
            ))}
          </div>
        </div>
    </HomeComponentContainer>
  )
}
