import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H3 } from 'components/Title';
import { Confirm } from 'components/Popup';
import BackLink from 'containers/blocks/BackLink';
import ProgramMedicationCreateForm from 'containers/forms/ProgramMedicationCreateForm';

import { onCreate } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@connect(
  (state, { params: { id } }) => ({
    medical_programs: state.data.medical_programs || []
  }),
  { onCreate }
)
export default class ProgramMedicationCreatePage extends React.Component {
  render() {
    const { medical_programs = {}, onCreate = () => {} } = this.props;

    return (
      <div id="program-medication-update-page">
        <Helmet
          title="Створення учасника медичної програми"
          meta={[
            {
              property: 'og:title',
              content: 'Створення учасника медчної програми'
            }
          ]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до деталей
        </BackLink>
        <H3>Створення учасника медичної програми</H3>
        <ProgramMedicationCreateForm
          onSubmit={onCreate}
          data={medical_programs}
        />
      </div>
    );
  }
}
