import {Request} from 'idelic-safety-net';
import {List, Record} from 'immutable';

import {Alias, ApiOptions, Id} from '../types';
import {runApi} from '../runApi';
import {
  createRecordListResponseTransformer,
  createRecordResponseTransformer
} from '../utils';

export type CustomerStatus =
  | 'DEV'
  | 'TESTING'
  | 'ONBOARDING'
  | 'LIVE'
  | 'DISABLED';

export interface Customer {
  id: Id;
  alias: Alias;
  name: string;
  status: CustomerStatus;
  logoUrl?: string;
}

export const CustomerRecord = Record<Customer>({
  id: -1,
  alias: '',
  name: '',
  status: 'DEV'
});

export function get(apiOptions: ApiOptions): Request<Customer[]>;
export function get(apiOptions: ApiOptions): Request<List<Record<Customer>>>;
export function get(apiOptions: ApiOptions): Request<any> {
  const transformers = createRecordListResponseTransformer<Customer>(
    apiOptions.useImmutable,
    CustomerRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/customers',
    apiOptions,
    requestOptions: {transformers}
  });
}

export function getByAlias(
  alias: Alias,
  apiOptions: ApiOptions
): Request<Customer>;
export function getByAlias(
  alias: Alias,
  apiOptions: ApiOptions
): Request<Record<Customer>>;
export function getByAlias(
  alias: Alias,
  apiOptions: ApiOptions = {}
): Request<any> {
  const transformers = createRecordResponseTransformer<Customer>(
    apiOptions.useImmutable,
    CustomerRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/customers/${alias}`,
    apiOptions,
    requestOptions: {transformers}
  });
}
