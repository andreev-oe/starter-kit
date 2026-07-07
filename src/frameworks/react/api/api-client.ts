import {
  API_CONTENT_TYPES,
  API_ERROR_MESSAGES,
  API_HEADERS,
  API_RESPONSE_STATUS_CODES,
} from './api.consts';
import type { ApiHttpMethod } from './api.consts';

type ApiRequestParameters<ResponseData, RequestBody = unknown> = {
  body?: RequestBody;
  method: ApiHttpMethod;
  parseResponse: (responseBody: unknown) => ResponseData;
  route: string;
  signal?: AbortSignal;
};

export class ApiResponseError extends Error {
  readonly responseBody: unknown;

  readonly statusCode: number;

  constructor(message: string, statusCode: number, responseBody: unknown) {
    super(message);
    this.name = ApiResponseError.name;
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

/** Выполняет API-запрос и применяет parser для данных на границе внешней системы. */
export async function requestApi<ResponseData, RequestBody = unknown>(
  parameters: ApiRequestParameters<ResponseData, RequestBody>,
) {
  const headers = new Headers();

  if (hasApiRequestBody(parameters)) {
    headers.set(API_HEADERS.contentType, API_CONTENT_TYPES.json);
  }

  const response = await fetch(parameters.route, {
    body: hasApiRequestBody(parameters) ? JSON.stringify(parameters.body) : undefined,
    headers,
    method: parameters.method,
    signal: parameters.signal,
  });
  const responseBody = await readApiResponseBody(response);

  if (!response.ok) {
    throw new ApiResponseError(API_ERROR_MESSAGES.requestFailed, response.status, responseBody);
  }

  return parameters.parseResponse(responseBody);
}

/** Проверяет, что ошибка пришла из API client. */
export function isApiResponseError(error: unknown): error is ApiResponseError {
  return error instanceof ApiResponseError;
}

/** Проверяет, что API-запрос содержит тело. */
function hasApiRequestBody<ResponseData, RequestBody>(
  parameters: ApiRequestParameters<ResponseData, RequestBody>,
): parameters is ApiRequestParameters<ResponseData, RequestBody> & { body: RequestBody } {
  return parameters.body !== undefined;
}

/** Читает тело HTTP-ответа в формате, соответствующем response headers. */
async function readApiResponseBody(response: Response) {
  if (response.status === API_RESPONSE_STATUS_CODES.noContent) {
    return null;
  }

  const contentType = response.headers.get(API_HEADERS.contentType);

  if (contentType !== null && contentType.includes(API_CONTENT_TYPES.json)) {
    return response.json();
  }

  return response.text();
}
