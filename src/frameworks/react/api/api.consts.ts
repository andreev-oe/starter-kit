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
  requestFailed: 'API request failed',
} as const;

export const API_ROUTE_ROOTS = {
  api: '/api',
} as const;

export const API_ROUTE_SEGMENTS = {
  root: '',
} as const;

export type ApiHttpMethod = (typeof API_HTTP_METHODS)[keyof typeof API_HTTP_METHODS];
