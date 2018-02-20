import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { provideHooks } from "redial";
import Helmet from "react-helmet";
import format from "date-fns/format";

import { H1, H2 } from "components/Title";
import { ListTable, ListShowBy } from "components/List";
import Table from "components/Table";
import ColoredText from "components/ColoredText";
import Button from "components/Button";
import Pagination from "components/Pagination";

import ShowBy from "containers/blocks/ShowBy";
import DictionaryValue from "containers/blocks/DictionaryValue";
import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";
import DateFilterField from "containers/forms/DateFilterField";

import { getRegisters } from "reducers";
import required from "helpers/validators/required-validate";

import { fetchRegistersList } from "./redux";

const DATE_FORMAT = "DD/MM/YYYY";

const RegistersPage = ({ registers = [], paging = {}, location }) => (
  <div id="files-list-page">
    <Helmet title="Файли" meta={[{ property: "og:title", content: "Файли" }]} />
    {console.log(registers)}
    <H1>Персони</H1>

    <div>
      <H2>Пошук файлу</H2>
      {/*<SearchForm fields={SEARCH_FIELDS} location={location} />*/}
    </div>

    <div>
      <ListShowBy>
        <ShowBy location={location} />
      </ListShowBy>

      <ListTable id="files-table">
        <Table
          columns={[
            { key: "id", title: "ID Файлу" },
            { key: "inserted_at", title: "Дата додавання" },
            { key: "type", title: "Тип файлу" },
            { key: "file_name", title: "Назва файлу" },
            { key: "person_type", title: "Тип людини" },
            { key: "qty", title: "Статистика", width: 150 },
            { key: "errors", title: "Помилки" },
            { key: "status", title: "Статус файлу" },
            { key: "action", title: "Дії" }
          ]}
          data={registers.map(
            ({
              id,
              file_name,
              inserted_at,
              status,
              person_type,
              type,
              errors,
              qty: { errors: warnings, not_found, processing, total }
            }) => ({
              id,
              inserted_at: format(inserted_at, DATE_FORMAT),
              type: (
                <DictionaryValue
                  dictionary="REGISTER_TYPE"
                  value={type.toUpperCase()}
                />
              ),
              file_name,
              person_type,
              qty: (
                <div>
                  {`Не знайдено:${not_found}`}
                  <br />
                  {`В процесі:${processing}`}
                  <br />
                  {`Помилок:${warnings}`}
                  <br />
                  {`Усьго записів:${total}`}
                  <br />
                </div>
              ),
              status,
              errors,
              action: (
                <Button
                  id={`show-declaration-detail-button-${id}`}
                  theme="link"
                  to={`/declarations/?person_id=${id}`}
                >
                  Деталі
                </Button>
              )
            })
          )}
        />
      </ListTable>
      {paging.total_pages > 1 && (
        <Pagination
          currentPage={paging.page_number}
          totalPage={paging.total_pages}
          location={location}
          cb={() => {}}
        />
      )}
    </div>
  </div>
);

export default compose(
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(
        fetchRegistersList({
          page_size: 10,
          ...query
        })
      )
  }),
  connect(state => ({
    ...state.pages.RegistersPage,
    registers: getRegisters(state, state.pages.RegistersPage.registers)
  }))
)(RegistersPage);