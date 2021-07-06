import net, {Request, RequestHeaders, RequestOptions} from '@idelic/safety-net';

import {config} from './config';
import {ApiError, ErrorResponse} from './error';
import {Api} from './types';

export function runApi<R, T>(api: Api<R, T>): Request<T> {
  if (!config.initialized && !api.apiOptions?.bypassInitializeCheck) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  const apiOptions = api.apiOptions || {};

  const options: RequestOptions<R, T, ErrorResponse> = api.requestOptions
    ? {...api.requestOptions}
    : {};

  options.headers = options.headers || [];
  options.on = options.on || {};

  if (apiOptions.headers) {
    options.headers = mergeHeaders(options.headers, apiOptions.headers);
  }

  if (!getHeader(options.headers, 'Authorization') && config.authToken) {
    options.headers = mergeHeaders(options.headers, [
      ['Authorization', `Bearer ${config.authToken}`]
    ]);
  }

  if (apiOptions.on) {
    options.on = {
      ...options.on,
      ...apiOptions.on
    };
  }

  if (api.notJson !== true) {
    options.headers = setHeader(
      options.headers,
      'Content-Type',
      'application/json'
    );
  }

  options.transformers = {
    error: (netError) => new ApiError(netError),
    ...options.transformers
  };

  const urlRoot =
    apiOptions.customUrlRoot || config[api.urlRoot || 'apiUrlRoot'];

  if (!urlRoot) {
    throw new Error(
      `Invalid URL '${urlRoot}' used for route '${api.route}'. Check your 'initializeConfig' call or make sure you are passing in a valid 'customUrlRoute'.`
    );
  }

  const request = net.request<R, T, ErrorResponse>(
    api.method,
    new URL(api.route, urlRoot).toString(),
    options
  );
  request.response.catch(catchAuthError);
  return request;
}

function catchAuthError(error: ApiError): void {
  if (error.status === 401) {
    if (!config.initialized) {
      throw new Error(
        'Config was not properly initialized. Please call `initializeConfig` first.'
      );
    }
    config.onAuthError(error);
  }
}

function mergeHeaders(
  headers1: RequestHeaders,
  headers2: RequestHeaders
): RequestHeaders {
  if (Array.isArray(headers1) && Array.isArray(headers2)) {
    return headers1.concat(headers2);
  }
  if (Array.isArray(headers1)) {
    return headers1.concat(convertObjectHeadersToArrayHeaders(headers2));
  }
  if (Array.isArray(headers2)) {
    return convertObjectHeadersToArrayHeaders(headers1).concat(headers2);
  }
  return {
    ...headers1,
    ...headers2
  };
}

function getHeader(headers: RequestHeaders, name: string): any {
  if (Array.isArray(headers)) {
    return headers.find((header) => header[0] === name);
  }
  return headers.get(name);
}

function convertObjectHeadersToArrayHeaders(
  headers: Record<string, any>
): [string, any][] {
  return Object.keys(headers).map((key) => [key, headers[key]]);
}

function setHeader(
  headers: RequestHeaders,
  name: string,
  value: any
): RequestHeaders {
  if (Array.isArray(headers)) {
    const headerIndex = headers.findIndex(
      ([headerName]) => name === headerName
    );
    if (headerIndex >= 0) {
      const newHeaders = [...headers];
      newHeaders[headerIndex][1] = value;
      return newHeaders;
    }
    return [...headers, [name, value]];
  }
  return {
    ...headers,
    [name]: value
  };
}
