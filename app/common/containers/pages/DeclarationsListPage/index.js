import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getDeclarations } from 'reducers';

import { fetchDeclarations } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDeclarations()),
})
@connect(state => ({
  ...state.pages.DeclarationsListPage,
  declarations: getDeclarations(state, state.pages.DeclarationsListPage.declarations),
}))
export default class DeclarationsListPage extends React.Component {
  render() {
    const { declarations = [] } = this.props;

    return (
      <div id="declarations-list-page">
        <H1>Declarations</H1>
        <p>Select declaration to edit</p>
        <div id="declarations-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'person', title: 'Person' },
              { key: 'legalEntity', title: 'Legal entity' },
              { key: 'dates', title: 'Dates', width: 150 },
              { key: 'action', title: 'Action', width: 100 },
            ]}
            data={declarations.map(item => ({
              id: item.id,
              person: (
                <div>
                  {`${item.person.last_name} ${item.person.first_name}`}
                  <div>{item.person.second_name}</div>
                </div>
              ),
              legalEntity: (
                <div>
                  {item.legal_entity.name}
                  <div className={styles.gray}>EDRPOU: {item.legal_entity.edrpou}</div>
                </div>
              ),
              dates: `${format(item.start_date, 'DD.MM.YYYY hh:mm')} ${format(item.end_date, 'DD.MM.YYYY hh:mm')}`,
              action: (<Button id={`show-declaration-detail-button-${item.id}`} theme="link" to={`/declarations/${item.id}`}>Details</Button>),
            }))}
          />
        </div>
      </div>
    );
  }
}
