import type { APIRoute } from 'astro';

import { API_RESPONSE_STATUS_CODES } from '../../../../frameworks/react/api/api.consts';
import { MVP_CHAT_ENDPOINT_ERROR_RESPONSES } from '../../../../server/mvp-chat/mvp-chat-endpoint.consts';
import { isSendMvpChatAudioMessageRequestBody } from '../../../../server/mvp-chat/mvp-chat-endpoint-type-guards.utils';
import { MvpChatStorageReadError, appendMvpChatAudioMessage } from '../../../../server/mvp-chat/mvp-chat-storage.utils';
import { createJsonResponse } from '../../../../server/shared/server-response.utils';

export const prerender = false;

export const POST = (async ({ request }) => {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return createJsonResponse(
      MVP_CHAT_ENDPOINT_ERROR_RESPONSES.invalidRequestBody,
      API_RESPONSE_STATUS_CODES.badRequest,
    );
  }

  if (!isSendMvpChatAudioMessageRequestBody(requestBody)) {
    return createJsonResponse(
      MVP_CHAT_ENDPOINT_ERROR_RESPONSES.invalidRequestBody,
      API_RESPONSE_STATUS_CODES.badRequest,
    );
  }

  try {
    const message = await appendMvpChatAudioMessage(requestBody);

    return createJsonResponse(message);
  } catch (error) {
    if (error instanceof MvpChatStorageReadError) {
      return createJsonResponse(
        MVP_CHAT_ENDPOINT_ERROR_RESPONSES.readFailed,
        API_RESPONSE_STATUS_CODES.internalServerError,
      );
    }

    return createJsonResponse(
      MVP_CHAT_ENDPOINT_ERROR_RESPONSES.writeFailed,
      API_RESPONSE_STATUS_CODES.internalServerError,
    );
  }
}) satisfies APIRoute;
