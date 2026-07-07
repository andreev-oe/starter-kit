export const QUERY_STRING_PREFIX = '?';

export const EMPTY_QUERY_STRING = '';

export const SEARCH_PARAMETER_NAMES = {
  limit: 'limit',
  page: 'page',
  todoId: 'todoId',
} as const;

export const QUERY_STRING_ARRAY_FORMAT = {
  brackets: 'brackets',
} as const;

export const TODOS_SEARCH_PARAMETER_DEFAULTS = {
  limit: 10,
  page: 1,
} as const;

export const TODOS_SEARCH_PARAMETER_LIMITS = {
  minLimit: 1,
  minPage: 1,
} as const;

export const QUERY_PARAMETER_NUMBER_SETTINGS = {
  radix: 10,
} as const;

export const PAGINATION_SETTINGS = {
  pageStep: 1,
} as const;
