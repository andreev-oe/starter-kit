import {
  MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES,
  MVP_CHAT_AUTHORS,
  MVP_CHAT_MESSAGE_FIELD_NAMES,
  MVP_CHAT_PAYLOAD_TYPES,
  MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES,
} from './mvp-chat.consts';
import type { MvpChatAudioPayload, MvpChatAuthor, MvpChatMessage, MvpChatTextPayload } from './mvp-chat.types';

/** Проверяет, что значение является объектом с ключами. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

/** Проверяет, что значение является автором MVP-чата. */
export function isMvpChatAuthor(value: unknown): value is MvpChatAuthor {
  return value === MVP_CHAT_AUTHORS.companion || value === MVP_CHAT_AUTHORS.user;
}

/** Проверяет, что значение является текстовым payload сообщения MVP-чата. */
export function isMvpChatTextPayload(value: unknown): value is MvpChatTextPayload {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value[MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES.type] === MVP_CHAT_PAYLOAD_TYPES.text &&
    typeof value[MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES.text] === 'string'
  );
}

/** Проверяет, что значение является аудио payload сообщения MVP-чата. */
export function isMvpChatAudioPayload(value: unknown): value is MvpChatAudioPayload {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.type] === MVP_CHAT_PAYLOAD_TYPES.audio &&
    typeof value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.base64Audio] === 'string' &&
    typeof value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.mimeType] === 'string' &&
    typeof value[MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES.sizeBytes] === 'number'
  );
}

/** Проверяет, что значение является сообщением MVP-чата. */
export function isMvpChatMessage(value: unknown): value is MvpChatMessage {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isMvpChatAuthor(value[MVP_CHAT_MESSAGE_FIELD_NAMES.author]) &&
    typeof value[MVP_CHAT_MESSAGE_FIELD_NAMES.id] === 'string' &&
    typeof value[MVP_CHAT_MESSAGE_FIELD_NAMES.timestamp] === 'string' &&
    (isMvpChatTextPayload(value[MVP_CHAT_MESSAGE_FIELD_NAMES.payload]) ||
      isMvpChatAudioPayload(value[MVP_CHAT_MESSAGE_FIELD_NAMES.payload]))
  );
}

/** Проверяет, что значение является списком сообщений MVP-чата. */
export function isMvpChatMessageList(value: unknown): value is MvpChatMessage[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((message) => isMvpChatMessage(message));
}
