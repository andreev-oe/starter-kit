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
  badRequest: 400,
  internalServerError: 500,
  noContent: 204,
  ok: 200,
} as const;

export const API_ERROR_MESSAGES = {
  invalidResponse: 'Invalid API response',
  requestFailed: 'API request failed',
} as const;

export const API_BASE_URLS = {
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com',
  local: '',
} as const;

export const API_ROUTE_SEGMENTS = {
  api: 'api',
  audio: 'audio',
  messages: 'messages',
  mvpChat: 'mvp-chat',
  text: 'text',
  todos: 'todos',
} as const;

export const API_QUERY_PARAMETER_NAMES = {
  limit: '_limit',
  page: '_page',
} as const;

export type ApiHttpMethod = (typeof API_HTTP_METHODS)[keyof typeof API_HTTP_METHODS];

export type ApiResponseStatusCode = (typeof API_RESPONSE_STATUS_CODES)[keyof typeof API_RESPONSE_STATUS_CODES];
