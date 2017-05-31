import { handleAction, combineActions } from 'redux-actions';
import { MOCK_API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { employee } from 'schemas';
import { invoke } from './api';

export const fetchEmployees = options => invoke({
  endpoint: createUrl(`${MOCK_API_URL}/api/employees`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['employees/FETCH_LIST_REQUEST', {
    type: 'employees/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [employee])
    ),
  }, 'employees/FETCH_LIST_FAILURE'],
});

export const fetchEmployee = id => invoke({
  endpoint: createUrl(`${MOCK_API_URL}/api/employees/${id}`),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['employees/FETCH_DETAILS_REQUEST', {
    type: 'employees/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, employee)
    ),
  }, 'employees/FETCH_DETAILS_FAILURE'],
});

export default handleAction(
  combineActions(
    'employees/FETCH_LIST_SUCCESS',
    'employees/FETCH_DETAILS_SUCCESS',
    'employees/CREATE_SUCCESS',
    'employees/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.employees,
  }),
  {}
);
