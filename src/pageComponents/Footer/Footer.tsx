import React from 'react'
import { HomeComponentContainer } from '@/components/HomeComponentContainer/HomeComponentContainer'
import styles from './footer.module.scss'
import { Logo } from '@/components/Logo/Logo'
import { SIZES } from '@/utils/types'
import Link from 'next/link'
import { FacebookIcon, GoogleIcon, TwitterIcon } from '@/components/SocialIcons'
import { constants } from '@/config/constants'
import localTexts from '@/app/homepage.texts.json'

const { CLIENT_ROUTES, SOCIAL_LINKS } = constants;

const socialIcons = [
  { href: SOCIAL_LINKS.facebook, icon: FacebookIcon },
  { href: SOCIAL_LINKS.google, icon: GoogleIcon },
  { href: SOCIAL_LINKS.twitter, icon: TwitterIcon },
];

const { footer } = localTexts;

export default function Footer() {
  return (
    <HomeComponentContainer className={styles.component} styleWrapper={styles.componentWrapper}>
      <footer>
        <div className={styles.footerContent}>
          <Logo size={SIZES.LARGE} />

          <div className={styles.footerLinks}>
            {footer.columns.map((column, index) => (
              <div key={index} className={styles.footerLinksColumn}>
                <h3 className={styles.footerLinksColumnTitle}>
                  {column.title}
                </h3>

                <ul className={styles.footerLinksColumnList}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={CLIENT_ROUTES.home} className={styles.footerLink}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.footerLinksColumn}>
              <h3 className={styles.footerLinksColumnTitle}>
                Follow us
              </h3>

              <ul className={styles.footerSocialIcons}>
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <li key={index}>
                      <Link aria-label={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon}>
                        <IconComponent />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            {footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </HomeComponentContainer>
  )
}
