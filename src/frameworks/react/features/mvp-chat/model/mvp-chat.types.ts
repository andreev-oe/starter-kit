import type { MVP_CHAT_AUTHORS, MVP_CHAT_PAYLOAD_TYPES } from './mvp-chat.consts';

export type MvpChatAuthor = (typeof MVP_CHAT_AUTHORS)[keyof typeof MVP_CHAT_AUTHORS];

export type MvpChatPayloadType = (typeof MVP_CHAT_PAYLOAD_TYPES)[keyof typeof MVP_CHAT_PAYLOAD_TYPES];

export type MvpChatTextPayload = {
  text: string;
  type: MvpChatPayloadType;
};

export type MvpChatMessage = {
  author: MvpChatAuthor;
  payload: MvpChatTextPayload;
  timestamp: string;
};
