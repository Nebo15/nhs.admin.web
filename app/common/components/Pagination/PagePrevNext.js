import React from 'react';
import withStyles from 'withStyles';
import classnames from 'classnames';
import Icon from 'components/Icon';
import styles from './styles.scss';

@withStyles(styles)
export default class PagePrevNext extends React.Component {
  render() {
    const { buttonType, display, goTo, href } = this.props;
    return (
      <li
        className={classnames(
          styles.page,
          styles[`g-pagination-${buttonType}`],
          !display && styles['s-hidden'],
        )}
      >
        <a href={href} data-page={goTo}>
          { buttonType === 'next' && <Icon name="arrow-right" /> }
          { buttonType === 'prev' && <Icon name="arrow-left" /> }
        </a>
      </li>
    );
  }
}
