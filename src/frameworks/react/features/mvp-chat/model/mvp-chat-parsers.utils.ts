import { API_ERROR_MESSAGES } from '../../../api/api.consts';
import { isMvpChatMessage, isMvpChatMessageList } from './mvp-chat-type-guards.utils';

/** Возвращает типизированное сообщение MVP-чата из ответа API. */
export function parseMvpChatMessage(responseBody: unknown) {
  if (!isMvpChatMessage(responseBody)) {
    throw new Error(API_ERROR_MESSAGES.invalidResponse);
  }

  return responseBody;
}

/** Возвращает типизированный список сообщений MVP-чата из ответа API. */
export function parseMvpChatMessageList(responseBody: unknown) {
  if (!isMvpChatMessageList(responseBody)) {
    throw new Error(API_ERROR_MESSAGES.invalidResponse);
  }

  return responseBody;
}
