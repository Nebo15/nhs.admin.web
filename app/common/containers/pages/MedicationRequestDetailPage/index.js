import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import format from 'date-fns/format';

import Line from 'components/Line';
import { DetailMain } from 'components/Detail';
import { H1 } from 'components/Title';
import DataList from 'components/DataList';

import BackLink from 'containers/blocks/BackLink';
import DictionaryValue from 'containers/blocks/DictionaryValue';
import Container from 'containers/blocks/Container';

import { getMedicationRequest } from 'reducers';

import { fetchMedicationRequest } from './redux';

const MedicationRequestDetailPage = ({
  router,
  medication_request: {
    id,
    status,
    request_number,
    created_at,
    started_at,
    ended_at,
    dispense_valid_from,
    dispense_valid_to,
    legal_entity = {},
    division = {},
    employee: { party = {}, ...employee } = {},
    person = {},
    medication_info: {
      medication_name,
      medication_id,
      form,
      dosage,
      medication_qty
    } = {},
    medical_program = {}
  } = {}
}) => (
  <div id="medication-request-detail-page">
    <Helmet
      title={`Рецепти - Рецепт ${id}`}
      meta={[{ property: 'og:title', content: `Рецепти - Рецепт ${id}` }]}
    />

    <BackLink onClick={() => router.goBack()}>
      Повернутися до списку рецептів
    </BackLink>

    <Line />

    <DetailMain>
      <H1>I. Загальна інформація</H1>

      <DataList
        list={[
          { name: 'ID рецепту', value: id },
          { name: 'Статус', value: status },
          { name: 'Номер рецепту', value: request_number },
          { name: 'Дата створення', value: format(created_at, 'DD/MM/YYYY') },
          { name: 'Дата початку', value: format(started_at, 'DD/MM/YYYY') },
          { name: 'Дата закінчення', value: format(ended_at, 'DD/MM/YYYY') },
          {
            name: 'Відпуск дійсний з',
            value: format(dispense_valid_from, 'DD/MM/YYYY')
          },
          {
            name: 'Відпуск дійсний по',
            value: format(dispense_valid_to, 'DD/MM/YYYY')
          }
        ]}
      />

      <Line />

      <H1>II. Інформація про медичний заклад</H1>

      <DataList
        list={[
          { name: 'ID медичного закладу', value: legal_entity.id },
          { name: 'Назва', value: legal_entity.name },
          { name: 'ЄДРПОУ', value: legal_entity.edrpou },
          { name: 'ID підрозділу', value: division.id },
          { name: 'Назва підрозділу', value: division.name }
        ]}
      />

      <Line />

      <H1>III. Інформація про працівника</H1>

      <DataList
        list={[
          { name: 'ID працівника', value: employee.id },
          { name: 'Прізвище', value: party.last_name },
          { name: "Ім'я", value: party.first_name },
          party.second_name && { name: 'По батькові', value: party.second_name }
        ]}
      />

      <Line />

      <H1>IV. Інформація про пацієнта</H1>

      <DataList
        list={[
          { name: 'ID особи', value: person.id },
          { name: 'Прізвище', value: person.last_name },
          { name: "Ім'я", value: person.first_name },
          person.second_name && {
            name: 'По батькові',
            value: person.second_name
          },
          {
            name: 'Дата народження',
            value: format(person.birth_date, 'DD/MM/YYYY')
          }
        ]}
      />

      <Line />

      <H1>V. Лікарський засіб</H1>

      <DataList
        list={[
          { name: 'Назва', value: medication_name },
          { name: 'ID дозування', value: medication_id },
          {
            name: 'Форма',
            value: <DictionaryValue dictionary="MEDICATION_FORM" value={form} />
          },
          { name: 'Дозування', value: <Container container={dosage} /> },
          { name: 'Кількість препарату', value: medication_qty }
        ]}
      />

      <Line />

      <H1>VI. Медична програма</H1>

      <DataList
        list={[
          { name: 'ID програми', value: medical_program.id },
          { name: 'Назва програми', value: medical_program.name }
        ]}
      />
    </DetailMain>
  </div>
);

export default compose(
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params: { id } }) =>
      dispatch(fetchMedicationRequest(id))
  }),
  connect((state, { params: { id } }) => ({
    medication_request: getMedicationRequest(state, id)
  }))
)(MedicationRequestDetailPage);
