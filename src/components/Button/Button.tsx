import React from 'react'
import { VARIANTS } from '@/utils/types';
import cx from 'classnames';
import styles from './button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    variant?: VARIANTS;
    isDashboard?: boolean;
};
export const Button: React.FC<ButtonProps> = props => {
    const { className, title, variant = VARIANTS.PRIMARY, ...rest } = props;

    const buttonClass = cx(styles.button, className, {
        [styles.primary]: variant === VARIANTS.PRIMARY,
        [styles.secondary]: variant === VARIANTS.SECONDARY,
    });

  return (
    <button className={cx(styles.button, buttonClass)} {...rest}>
        {title}
    </button>
  )
}
