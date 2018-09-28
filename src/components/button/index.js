import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'utils';
import styles from './styles.scss';

const Button = ({ accent, className, children, ...others }) => (
  <button
    className={cx(accent ? styles.buttonAccent : styles.button, className)}
    {...others}
  >
    <div className={styles.inner}>
      {children}
    </div>
  </button>
);

Button.propTypes = {
  accent: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Button;
