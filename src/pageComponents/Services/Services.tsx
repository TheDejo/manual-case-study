import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './services.module.scss'
import ServiceCard from './subComponents/ServiceCard'
import erectionsImage from '@/assets/images/homepage/erecetile-dysfunction.png'
import erectionsImage2 from '@/assets/images/homepage/number-two.png'
import hairLossImage from '@/assets/images/homepage/hair-loss.png'
import hairLossImage2 from '@/assets/images/homepage/number-one.png'

export default function Services() {
  return (
    <HomeComponentContainer className={styles.component}>
        <div>
          <h3 className={styles.servicesTitle}>
          What we can help with
          </h3>
          <div className={styles.servicesCards}>
          <ServiceCard
          tag="Hair loss"
            description="We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
          title="Hair loss needn’t be irreversible. We can help!"
            serviceNumber={1}
            mainImage={hairLossImage}
            secondaryImage={hairLossImage2}
          />
          <ServiceCard 
          tag="Erecetile dysfunction"
          description="We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
          title="Erections can be a tricky thing. But no need to feel down!"
            serviceNumber={2}
              mainImage={erectionsImage}
              secondaryImage={erectionsImage2}
            />
          </div>
        </div>
    </HomeComponentContainer>
  )
}
