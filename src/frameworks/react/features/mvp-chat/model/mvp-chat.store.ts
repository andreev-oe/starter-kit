import { create } from 'zustand';

import {
  MVP_CHAT_AUDIO_MIME_TYPE_OPTIONS,
  MVP_CHAT_AUTHORS,
  MVP_CHAT_PAYLOAD_TYPES,
  MVP_CHAT_RECORDING_STATUSES,
} from './mvp-chat.consts';
import { INITIAL_MVP_CHAT_MESSAGES } from './mvp-chat-messages.consts';
import type { MvpChatMessage, MvpChatRecordingStatus } from './mvp-chat.types';

const EMPTY_MVP_CHAT_MESSAGES: MvpChatMessage[] = [];
const EMPTY_AUDIO_CHUNKS: Blob[] = [];
const EMPTY_AUDIO_MIME_TYPE = '';
const EMPTY_BLOB_SIZE_BYTES = 0;
const NO_MICROPHONE_ACCESS_ERROR_MESSAGE = 'Не удалось получить доступ к микрофону';
const NO_MEDIA_RECORDER_ERROR_MESSAGE = 'Браузер не поддерживает запись аудио';

const AUDIO_MEDIA_CONSTRAINTS: MediaStreamConstraints = {
  audio: true,
};

type MvpChatState = {
  audioRecordingErrorMessage: string | null;
  clearPendingAudio: () => void;
  initializeMessages: () => void;
  isMessageSending: boolean;
  mediaRecorder: MediaRecorder | null;
  mediaStream: MediaStream | null;
  messages: MvpChatMessage[];
  pendingAudioBlob: Blob | null;
  pendingAudioMimeType: string | null;
  pendingAudioSizeBytes: number | null;
  pendingAudioUrl: string | null;
  recordedAudioChunks: Blob[];
  recordingStatus: MvpChatRecordingStatus;
  sendMessage: (messageText: string) => Promise<void>;
  startAudioRecording: () => Promise<void>;
  stopAudioRecording: () => Promise<void>;
};

/** Возвращает первый поддерживаемый браузером MIME type для записи аудио. */
function getSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === 'undefined') {
    return EMPTY_AUDIO_MIME_TYPE;
  }

  const supportedAudioMimeType = MVP_CHAT_AUDIO_MIME_TYPE_OPTIONS.find((audioMimeType) => {
    return MediaRecorder.isTypeSupported(audioMimeType);
  });

  return supportedAudioMimeType ?? EMPTY_AUDIO_MIME_TYPE;
}

/** Останавливает все tracks медиапотока микрофона. */
function stopMediaStream(mediaStream: MediaStream | null) {
  if (mediaStream === null) {
    return;
  }

  mediaStream.getTracks().forEach((mediaStreamTrack) => {
    mediaStreamTrack.stop();
  });
}

/** Хранит сообщения MVP-чата и состояние отправки сообщения. */
export const useMvpChatStore = create<MvpChatState>((set, get) => {
  return {
    audioRecordingErrorMessage: null,
    clearPendingAudio: () => {
      const pendingAudioUrl = get().pendingAudioUrl;

      if (pendingAudioUrl !== null) {
        URL.revokeObjectURL(pendingAudioUrl);
      }

      set({
        pendingAudioBlob: null,
        pendingAudioMimeType: null,
        pendingAudioSizeBytes: null,
        pendingAudioUrl: null,
        recordedAudioChunks: EMPTY_AUDIO_CHUNKS,
        recordingStatus: MVP_CHAT_RECORDING_STATUSES.idle,
      });
    },
    initializeMessages: () => {
      if (get().messages.length > 0) {
        return;
      }

      set({
        messages: INITIAL_MVP_CHAT_MESSAGES,
      });
    },
    isMessageSending: false,
    mediaRecorder: null,
    mediaStream: null,
    messages: EMPTY_MVP_CHAT_MESSAGES,
    pendingAudioBlob: null,
    pendingAudioMimeType: null,
    pendingAudioSizeBytes: null,
    pendingAudioUrl: null,
    recordedAudioChunks: EMPTY_AUDIO_CHUNKS,
    recordingStatus: MVP_CHAT_RECORDING_STATUSES.idle,
    sendMessage: async (messageText) => {
      set({
        isMessageSending: true,
      });

      const trimmedMessageText = messageText.trim();
      const pendingAudioUrl = get().pendingAudioUrl;
      const pendingAudioMimeType = get().pendingAudioMimeType;
      const pendingAudioSizeBytes = get().pendingAudioSizeBytes;
      const nextMessages: MvpChatMessage[] = [];

      if (trimmedMessageText.length > 0) {
        nextMessages.push({
          author: MVP_CHAT_AUTHORS.user,
          payload: {
            text: trimmedMessageText,
            type: MVP_CHAT_PAYLOAD_TYPES.text,
          },
          timestamp: new Date().toISOString(),
        });
      }

      if (pendingAudioUrl !== null && pendingAudioMimeType !== null && pendingAudioSizeBytes !== null) {
        nextMessages.push({
          author: MVP_CHAT_AUTHORS.user,
          payload: {
            audioUrl: pendingAudioUrl,
            mimeType: pendingAudioMimeType,
            sizeBytes: pendingAudioSizeBytes,
            type: MVP_CHAT_PAYLOAD_TYPES.audio,
          },
          timestamp: new Date().toISOString(),
        });
      }

      await Promise.resolve();

      set((state) => {
        return {
          isMessageSending: false,
          messages: [...state.messages, ...nextMessages],
          pendingAudioBlob: null,
          pendingAudioMimeType: null,
          pendingAudioSizeBytes: null,
          pendingAudioUrl: null,
          recordedAudioChunks: EMPTY_AUDIO_CHUNKS,
          recordingStatus: MVP_CHAT_RECORDING_STATUSES.idle,
        };
      });
    },
    startAudioRecording: async () => {
      if (typeof MediaRecorder === 'undefined') {
        set({
          audioRecordingErrorMessage: NO_MEDIA_RECORDER_ERROR_MESSAGE,
        });

        return;
      }

      if (typeof navigator === 'undefined' || navigator.mediaDevices === undefined) {
        set({
          audioRecordingErrorMessage: NO_MICROPHONE_ACCESS_ERROR_MESSAGE,
        });

        return;
      }

      get().clearPendingAudio();

      set({
        audioRecordingErrorMessage: null,
        recordingStatus: MVP_CHAT_RECORDING_STATUSES.requesting,
      });

      let requestedMediaStream: MediaStream | null = null;

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(AUDIO_MEDIA_CONSTRAINTS);
        requestedMediaStream = mediaStream;
        const supportedAudioMimeType = getSupportedAudioMimeType();
        const mediaRecorderOptions: MediaRecorderOptions = {};

        if (supportedAudioMimeType.length > 0) {
          mediaRecorderOptions.mimeType = supportedAudioMimeType;
        }

        const mediaRecorder = new MediaRecorder(mediaStream, mediaRecorderOptions);

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size === EMPTY_BLOB_SIZE_BYTES) {
            return;
          }

          set((state) => {
            return {
              recordedAudioChunks: [...state.recordedAudioChunks, event.data],
            };
          });
        });

        mediaRecorder.start();

        set({
          mediaRecorder,
          mediaStream,
          recordedAudioChunks: EMPTY_AUDIO_CHUNKS,
          recordingStatus: MVP_CHAT_RECORDING_STATUSES.recording,
        });
      } catch {
        stopMediaStream(requestedMediaStream);

        set({
          audioRecordingErrorMessage: NO_MICROPHONE_ACCESS_ERROR_MESSAGE,
          mediaRecorder: null,
          mediaStream: null,
          recordingStatus: MVP_CHAT_RECORDING_STATUSES.idle,
        });
      }
    },
    stopAudioRecording: async () => {
      const mediaRecorder = get().mediaRecorder;
      const mediaStream = get().mediaStream;

      if (mediaRecorder === null) {
        return;
      }

      await new Promise<void>((resolve) => {
        mediaRecorder.addEventListener(
          'stop',
          () => {
            const audioMimeType = mediaRecorder.mimeType.length > 0 ? mediaRecorder.mimeType : EMPTY_AUDIO_MIME_TYPE;
            const audioBlob = new Blob(get().recordedAudioChunks, {
              type: audioMimeType,
            });
            const audioUrl = URL.createObjectURL(audioBlob);

            stopMediaStream(mediaStream);

            set({
              mediaRecorder: null,
              mediaStream: null,
              pendingAudioBlob: audioBlob,
              pendingAudioMimeType: audioBlob.type,
              pendingAudioSizeBytes: audioBlob.size,
              pendingAudioUrl: audioUrl,
              recordingStatus: MVP_CHAT_RECORDING_STATUSES.recorded,
            });
            resolve();
          },
          {
            once: true,
          },
        );

        mediaRecorder.stop();
      });
    },
  };
});
