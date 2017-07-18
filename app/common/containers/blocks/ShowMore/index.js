import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';

import styles from './styles.scss';

@withStyles(styles)
export default class ShowMore extends React.Component {
  state = {
    show: false,
  };

  render() {
    const { name, children } = this.props;
    const { show } = this.state;

    return (
      <div className={styles.main}>
        <button
          className={classnames(styles.button, show && styles.button_active)}
          onClick={() => this.setState({ show: !show })}
        >
          {name} <span>▾</span>
        </button>

        <div className={classnames(styles.more, show && styles.more_show)}>
          {children}
        </div>
      </div>
    );
  }
}
