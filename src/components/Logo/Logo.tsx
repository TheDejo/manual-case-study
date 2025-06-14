import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/assets/images/logos/logo.svg';
import { constants } from '@/config/constants';
import { SIZES } from '@/utils/types';
import styles from './logo.module.scss';

const { CLIENT_ROUTES } = constants;

interface ILogo {
  size?: SIZES;
}

export const Logo: React.FC<ILogo> = ({
  size = SIZES.SMALL,
}) => {
  return (
    <Link
      className={cx(styles.component, styles[size])}
      href={CLIENT_ROUTES.home}
    >
      <Image
        loading="eager"
        fetchPriority="high"
        priority
        className={styles.logo}
        src={LogoImage}
        alt="MANUAL logo"
      />
    </Link>
  );
};
