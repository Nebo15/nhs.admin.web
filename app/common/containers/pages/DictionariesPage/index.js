import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getDictionaries } from 'reducers';

import { fetchDictionaries } from 'redux/dictionaries';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries()),
})
@connect(state => ({
  dictionaries: getDictionaries(state),
}))
export default class DictionariesPage extends React.Component {
  render() {
    const { dictionaries = [] } = this.props;

    return (
      <div id="dictionaries-page">
        <H1>Dictionaries</H1>
        {
          <div>
            <p>Select dictionary to edit</p>
            <div id="templates-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'name', title: 'Dictionary Name' },
                  { key: 'edit', title: 'Edit' },
                ]}
                data={Object.keys(dictionaries).map(dictionaryName => ({
                  name: <div className={styles.name}>
                    { dictionaryName }
                  </div>,
                  edit: (<Button
                    id={`edit-template-button-${dictionaryName}`}
                    theme="link"
                    to={`/dictionaries/${dictionaryName}`}
                  >
                    View&nbsp;Dictionary
                  </Button>),
                }))}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
