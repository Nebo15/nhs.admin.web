import React, { PropTypes } from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export const RadioInput = ({
  selected = false,
  onChange = e => e,
  disabled,
  value,
  name,
  children
}) => (
  <label className={styles.wrap}>
    <input
      type="radio"
      {...{
        onChange: () => !disabled && onChange(value),
        checked: selected,
        value,
        name,
        disabled
      }}
    />
    <span className={styles.view} />
    <span className={styles.label}>{children}</span>
  </label>
);

RadioInput.PropTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onChange: PropTypes.func
};

export default withStyles(styles)(RadioInput);
