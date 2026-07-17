import {
  MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES,
  MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES,
} from '../../frameworks/react/features/mvp-chat/model/mvp-chat.consts';
import { isRecord } from '../../frameworks/react/features/mvp-chat/model/mvp-chat-type-guards.utils';
import type {
  SendMvpChatAudioMessageRequestBody,
  SendMvpChatTextMessageVariables,
} from '../../frameworks/react/features/mvp-chat/model/mvp-chat.types';

const EMPTY_VALUE_LENGTH = 0;

/** Проверяет тело запроса на отправку текстового сообщения MVP-чата. */
export function isSendMvpChatTextMessageRequestBody(value: unknown): value is SendMvpChatTextMessageVariables {
  if (!isRecord(value)) {
    return false;
  }

  const text = value[MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES.text];

  return typeof text === 'string' && text.trim().length > EMPTY_VALUE_LENGTH;
}

/** Проверяет тело запроса на отправку голосового сообщения MVP-чата. */
export function isSendMvpChatAudioMessageRequestBody(value: unknown): value is SendMvpChatAudioMessageRequestBody {
  if (!isRecord(value)) {
    return false;
  }

  const base64Audio = value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.base64Audio];
  const mimeType = value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.mimeType];
  const sizeBytes = value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.sizeBytes];

  return (
    typeof base64Audio === 'string' &&
    base64Audio.length > EMPTY_VALUE_LENGTH &&
    typeof mimeType === 'string' &&
    mimeType.length > EMPTY_VALUE_LENGTH &&
    typeof sizeBytes === 'number' &&
    sizeBytes > EMPTY_VALUE_LENGTH
  );
}
