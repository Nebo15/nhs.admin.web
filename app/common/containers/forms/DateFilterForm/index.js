import React from 'react';
import withStyles from 'withStyles';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import { reduxFormValidate } from 'react-nebo15-validate';

import 'react-dates/lib/css/_datepicker.css';
import styles from './styles.scss';

@withStyles(styles)
export default class DateFilterForm extends React.Component {
  state = {
    startDate:
      this.props.active && this.props.active.startDate
        ? moment(this.props.active.startDate)
        : null,
    endDate:
      this.props.active && this.props.active.endDate
        ? moment(this.props.active.endDate)
        : null,
    focusedInput: ''
  };

  render() {
    const { onChange, label } = this.props;
    return (
      <div>
        <h4>{label}</h4>
        <div className={styles.datepicker}>
          <DateRangePicker
            isOutsideRange={() => false}
            hideKeyboardShortcutsPanel
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startDatePlaceholderText="Початок"
            endDatePlaceholderText="Кінець"
            onDatesChange={({ startDate, endDate }) => {
              endDate &&
                startDate &&
                onChange({
                  created_from: startDate.format('YYYY-MM-DD'),
                  created_to: endDate.format('YYYY-MM-DD')
                });
              this.setState({ startDate, endDate });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
      </div>
    );
  }
}