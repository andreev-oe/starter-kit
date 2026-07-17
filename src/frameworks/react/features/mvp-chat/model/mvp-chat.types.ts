import type { MVP_CHAT_AUTHORS, MVP_CHAT_PAYLOAD_TYPES, MVP_CHAT_RECORDING_STATUSES } from './mvp-chat.consts';

export type MvpChatAuthor = (typeof MVP_CHAT_AUTHORS)[keyof typeof MVP_CHAT_AUTHORS];

export type MvpChatRecordingStatus = (typeof MVP_CHAT_RECORDING_STATUSES)[keyof typeof MVP_CHAT_RECORDING_STATUSES];

export type MvpChatTextPayload = {
  text: string;
  type: typeof MVP_CHAT_PAYLOAD_TYPES.text;
};

export type MvpChatAudioPayload = {
  base64Audio: string;
  mimeType: string;
  sizeBytes: number;
  type: typeof MVP_CHAT_PAYLOAD_TYPES.audio;
};

export type MvpChatMessage = {
  author: MvpChatAuthor;
  id: string;
  payload: MvpChatTextPayload | MvpChatAudioPayload;
  timestamp: string;
};

export type SendMvpChatTextMessageVariables = {
  text: string;
};

export type SendMvpChatAudioMessageVariables = {
  audioBlob: Blob;
  mimeType: string;
  sizeBytes: number;
};

export type SendMvpChatAudioMessageRequestBody = {
  base64Audio: string;
  mimeType: string;
  sizeBytes: number;
};
