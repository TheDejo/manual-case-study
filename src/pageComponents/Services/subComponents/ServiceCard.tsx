import React from 'react'
import styles from './serviceCard.module.scss'
import Image, { StaticImageData } from 'next/image'
import cx from 'classnames'

interface ServiceCardProps {
  tag: string;
  description: string;
  title: string;
  serviceNumber: number;
  mainImage: StaticImageData;
  secondaryImage: StaticImageData; 
}


export default function ServiceCard({ tag, description, title, serviceNumber, mainImage, secondaryImage }: ServiceCardProps) {
const isEven = serviceNumber % 2 === 0;
  return (
    <div className={cx(styles.component, { [styles.isEven]: isEven })}>
      <div className={styles.serviceCardImage}>
        <div className={styles.mainImageContainer}>
          <Image src={mainImage} alt={title} className={styles.mainImage} />
        </div>
        <div className={styles.secondaryImageContainer}>
          <Image src={secondaryImage} alt={title} className={styles.secondaryImage} />
        </div>
      </div>
      <div className={styles.serviceCardContent}>
        <p className={styles.serviceCardTag}>
            {tag}
        </p>
        <h3 className={styles.serviceCardTitle}>
            {title}
        </h3>
        <p className={styles.serviceCardDescription}>
            {description}
        </p>
      </div>
    </div>
  )
}
