export const API_HTTP_METHODS = {
  delete: 'DELETE',
  get: 'GET',
  patch: 'PATCH',
  post: 'POST',
  put: 'PUT',
} as const;

export const API_HEADERS = {
  contentType: 'Content-Type',
} as const;

export const API_CONTENT_TYPES = {
  json: 'application/json',
} as const;

export const API_RESPONSE_STATUS_CODES = {
  noContent: 204,
} as const;

export const API_ERROR_MESSAGES = {
  invalidResponse: 'Invalid API response',
  requestFailed: 'API request failed',
} as const;

export const API_BASE_URLS = {
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com',
} as const;

export const API_ROUTE_SEGMENTS = {
  todos: 'todos',
} as const;

export const API_QUERY_PARAMETER_NAMES = {
  limit: '_limit',
  page: '_page',
} as const;

export type ApiHttpMethod = (typeof API_HTTP_METHODS)[keyof typeof API_HTTP_METHODS];
