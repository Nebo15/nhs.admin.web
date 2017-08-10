import { schema } from 'normalizr';

export const template = new schema.Entity('templates');
export const dictionary = new schema.Entity('dictionaries', {}, { idAttribute: 'name' });

export const clinic = new schema.Entity('clinics');
export const declaration = new schema.Entity('declarations');
export const employee = new schema.Entity('employees');
export const employeesRequest = new schema.Entity('employeesRequests');

export const globalStat = new schema.Entity('globalStat');
export const detailStat = new schema.Entity('detailStat');
export const declarationsStat = new schema.Entity('declarationsStat');
