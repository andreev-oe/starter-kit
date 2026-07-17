export const MVP_CHAT_AUTHORS = {
  companion: 'user2',
  user: 'user1',
} as const;

export const MVP_CHAT_PAYLOAD_TYPES = {
  audio: 'audio',
  text: 'text',
} as const;

export const MVP_CHAT_RECORDING_STATUSES = {
  idle: 'idle',
  recorded: 'recorded',
  recording: 'recording',
  requesting: 'requesting',
} as const;

export const MVP_CHAT_AUDIO_MIME_TYPES = {
  mp4: 'audio/mp4',
  webm: 'audio/webm',
  webmOpus: 'audio/webm;codecs=opus',
} as const;

export const MVP_CHAT_AUDIO_MIME_TYPE_OPTIONS = [
  MVP_CHAT_AUDIO_MIME_TYPES.webmOpus,
  MVP_CHAT_AUDIO_MIME_TYPES.webm,
  MVP_CHAT_AUDIO_MIME_TYPES.mp4,
] as const;

export const MVP_CHAT_MESSAGE_FIELD_NAMES = {
  author: 'author',
  id: 'id',
  payload: 'payload',
  timestamp: 'timestamp',
} as const;

export const MVP_CHAT_TEXT_PAYLOAD_FIELD_NAMES = {
  text: 'text',
  type: 'type',
} as const;

export const MVP_CHAT_AUDIO_PAYLOAD_FIELD_NAMES = {
  base64Audio: 'base64Audio',
  mimeType: 'mimeType',
  sizeBytes: 'sizeBytes',
  type: 'type',
} as const;
