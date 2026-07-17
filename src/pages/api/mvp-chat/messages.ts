import type { APIRoute } from 'astro';

import { API_RESPONSE_STATUS_CODES } from '../../../frameworks/react/api/api.consts';
import { MVP_CHAT_ENDPOINT_ERROR_RESPONSES } from '../../../server/mvp-chat/mvp-chat-endpoint.consts';
import { readMvpChatMessages } from '../../../server/mvp-chat/mvp-chat-storage.utils';
import { createJsonResponse } from '../../../server/shared/server-response.utils';

export const prerender = false;

export const GET = (async () => {
  try {
    const messages = await readMvpChatMessages();

    return createJsonResponse(messages);
  } catch {
    return createJsonResponse(
      MVP_CHAT_ENDPOINT_ERROR_RESPONSES.readFailed,
      API_RESPONSE_STATUS_CODES.internalServerError,
    );
  }
}) satisfies APIRoute;
