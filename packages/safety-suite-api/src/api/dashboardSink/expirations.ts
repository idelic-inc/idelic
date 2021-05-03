import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface ExpirationCounts {
  expired: number;
  expiresIn30Days: number;
  expiresIn60Days: number;
}

export interface Expiration extends BaseFields {
  recordNumber: number;
  expirationDate: string;
  terminalLabel: string;
  recordType: string;
}

export interface ExpirationResponse {
  expirations: Expiration[];
}

export function getExpirationCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<ExpirationCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getExpirations(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<ExpirationResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}