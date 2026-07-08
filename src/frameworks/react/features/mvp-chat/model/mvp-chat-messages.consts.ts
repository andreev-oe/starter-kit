import { MVP_CHAT_AUTHORS, MVP_CHAT_PAYLOAD_TYPES } from './mvp-chat.consts';
import type { MvpChatMessage } from './mvp-chat.types';

export const INITIAL_MVP_CHAT_MESSAGES: MvpChatMessage[] = [
  {
    author: MVP_CHAT_AUTHORS.companion,
    payload: {
      text: 'Привет. Чем могу помочь?',
      type: MVP_CHAT_PAYLOAD_TYPES.text,
    },
    timestamp: '2026-07-07T10:20:18.235Z',
  },
  {
    author: MVP_CHAT_AUTHORS.user,
    payload: {
      text: 'Нужно быстро собрать MVP чата.',
      type: MVP_CHAT_PAYLOAD_TYPES.text,
    },
    timestamp: '2026-07-07T10:22:18.235Z',
  },
  {
    author: MVP_CHAT_AUTHORS.companion,
    payload: {
      text: 'Готово, оставим простую структуру с полем ввода.',
      type: MVP_CHAT_PAYLOAD_TYPES.text,
    },
    timestamp: '2026-07-07T10:25:18.235Z',
  },
];
