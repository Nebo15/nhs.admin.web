import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import labels from 'redux/labels';
import clinics from 'redux/clinics';
import declarations from 'redux/declarations';

import Aside from 'containers/blocks/Aside/redux';

import ClinicsListPage from 'containers/pages/ClinicsListPage/redux';
import ClinicDetailPage from 'containers/pages/ClinicDetailPage/redux';

import DeclarationsListPage from 'containers/pages/DeclarationsListPage/redux';
import DeclarationDetailPage from 'containers/pages/DeclarationDetailPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  ClinicsListPage,
  ClinicDetailPage,
  DeclarationsListPage,
  DeclarationDetailPage,
});

const data = combineReducers({
  labels,
  clinics,
  declarations,
});

export default combineReducers({
  blocks,
  pages,
  data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getClinics = (state, ids) => denormalize(ids, [schemas.clinic], state.data);
export const getClinic = (state, id) => denormalize(id, schemas.clinic, state.data);

export const getDeclarations = (state, ids) => denormalize(ids, [schemas.declaration], state.data);
export const getDeclaration = (state, id) => denormalize(id, schemas.declaration, state.data);
