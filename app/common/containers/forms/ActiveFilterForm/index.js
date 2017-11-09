import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'components/Select';

@reduxForm({
  form: 'active-filter-form'
})
export default class ActiveFilterForm extends React.Component {
  render() {
    const { onChange = () => {}, active = null } = this.props;
    return (
      <div>
        <form>
          <Select
            name="is_active"
            placeholder="Активні/Не активні"
            active={active}
            options={[
              { title: 'Активні', name: true },
              { title: 'Не активні', name: false }
            ]}
            onChange={active => onChange(active)}
          />
        </form>
      </div>
    );
  }
}
