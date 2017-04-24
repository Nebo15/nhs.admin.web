import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromEmployees from 'redux/employees';

export const showEmployees = createAction('employeesListPage/SHOW_DECLARATIONS');

export const fetchEmployees = () => dispatch =>
  dispatch(fromEmployees.fetchEmployees({ limit: 100 }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(showEmployees(action.payload.result));
  });

const employees = handleAction(showEmployees, (state, action) => action.payload, []);

export default combineReducers({
  employees,
});
