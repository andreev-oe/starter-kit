import { API_CONTENT_TYPES, API_HEADERS, API_RESPONSE_STATUS_CODES } from '../../frameworks/react/api/api.consts';
import type { ApiResponseStatusCode } from '../../frameworks/react/api/api.consts';

/** Создает JSON HTTP-ответ с едиными headers. */
export function createJsonResponse(
  responseBody: unknown,
  statusCode: ApiResponseStatusCode = API_RESPONSE_STATUS_CODES.ok,
) {
  return new Response(JSON.stringify(responseBody), {
    headers: {
      [API_HEADERS.contentType]: API_CONTENT_TYPES.json,
    },
    status: statusCode,
  });
}
