import React from 'react';
import cx, { Argument as ClassNameType } from 'classnames';
import styles from './HomeComponentContainer.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: ClassNameType;
  styleWrapper?: ClassNameType;
}

export const HomeComponentContainer = ({ children, className, styleWrapper }: IProps) => {
  return (
    <section className={cx(styles.outerComponent, styleWrapper)}>
      <div className={cx(styles.component, className)}>{children}</div>
    </section>
  );
};
