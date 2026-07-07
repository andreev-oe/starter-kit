import * as qs from 'qs';

import { EMPTY_QUERY_STRING, QUERY_STRING_ARRAY_FORMAT, QUERY_STRING_PREFIX } from './query-parameters.consts';

type QueryParameterValue = number | string | boolean | null | undefined;

type QueryParameters = Record<string, QueryParameterValue>;

/** Собирает query string через qs с единым форматированием. */
export function stringifyQueryParameters(parameters: QueryParameters) {
  const queryString = qs.stringify(parameters, {
    addQueryPrefix: true,
    arrayFormat: QUERY_STRING_ARRAY_FORMAT.brackets,
    skipNulls: true,
  });

  return queryString;
}

/** Разбирает query string через qs. */
export function parseQueryParameters(search: string) {
  return qs.parse(removeQueryStringPrefix(search));
}

/** Убирает префикс query string перед передачей строки в qs. */
function removeQueryStringPrefix(search: string) {
  if (search.startsWith(QUERY_STRING_PREFIX)) {
    return search.slice(QUERY_STRING_PREFIX.length);
  }

  return search;
}

/** Возвращает query string без пустого префикса. */
export function normalizeQueryString(queryString: string) {
  if (queryString === QUERY_STRING_PREFIX) {
    return EMPTY_QUERY_STRING;
  }

  return queryString;
}
