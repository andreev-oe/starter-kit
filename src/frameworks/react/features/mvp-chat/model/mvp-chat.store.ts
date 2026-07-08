import { create } from 'zustand';

import { MVP_CHAT_AUTHORS, MVP_CHAT_PAYLOAD_TYPES } from './mvp-chat.consts';
import { INITIAL_MVP_CHAT_MESSAGES } from './mvp-chat-messages.consts';
import type { MvpChatMessage } from './mvp-chat.types';

const EMPTY_MVP_CHAT_MESSAGES: MvpChatMessage[] = [];

type MvpChatState = {
  initializeMessages: () => void;
  isMessageSending: boolean;
  messages: MvpChatMessage[];
  sendMessage: (messageText: string) => Promise<void>;
};

/** Хранит сообщения MVP-чата и состояние отправки сообщения. */
export const useMvpChatStore = create<MvpChatState>((set, get) => {
  return {
    initializeMessages: () => {
      if (get().messages.length > 0) {
        return;
      }

      set({
        messages: INITIAL_MVP_CHAT_MESSAGES,
      });
    },
    isMessageSending: false,
    messages: EMPTY_MVP_CHAT_MESSAGES,
    sendMessage: async (messageText) => {
      set({
        isMessageSending: true,
      });

      const nextMessage: MvpChatMessage = {
        author: MVP_CHAT_AUTHORS.user,
        payload: {
          text: messageText,
          type: MVP_CHAT_PAYLOAD_TYPES.text,
        },
        timestamp: new Date().toISOString(),
      };

      await Promise.resolve();

      set((state) => {
        return {
          isMessageSending: false,
          messages: [...state.messages, nextMessage],
        };
      });
    },
  };
});
