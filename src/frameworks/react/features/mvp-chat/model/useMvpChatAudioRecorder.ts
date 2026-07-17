import { useEffect, useRef, useState } from 'react';

import { MVP_CHAT_AUDIO_MIME_TYPE_OPTIONS, MVP_CHAT_RECORDING_STATUSES } from './mvp-chat.consts';
import type { MvpChatRecordingStatus } from './mvp-chat.types';

const EMPTY_AUDIO_CHUNKS: Blob[] = [];
const EMPTY_AUDIO_MIME_TYPE = '';
const EMPTY_BLOB_SIZE_BYTES = 0;
const NO_MICROPHONE_ACCESS_ERROR_MESSAGE = 'Не удалось получить доступ к микрофону';
const NO_MEDIA_RECORDER_ERROR_MESSAGE = 'Браузер не поддерживает запись аудио';

const AUDIO_MEDIA_CONSTRAINTS: MediaStreamConstraints = {
  audio: true,
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

/** Управляет записью аудио для MVP-чата и хранит только временный Blob до отправки. */
export function useMvpChatAudioRecorder() {
  const mediaRecorderReference = useRef<MediaRecorder | null>(null);
  const mediaStreamReference = useRef<MediaStream | null>(null);
  const pendingAudioUrlReference = useRef<string | null>(null);
  const recordedAudioChunksReference = useRef<Blob[]>(EMPTY_AUDIO_CHUNKS);
  const [audioRecordingErrorMessage, setAudioRecordingErrorMessage] = useState<string | null>(null);
  const [pendingAudioBlob, setPendingAudioBlob] = useState<Blob | null>(null);
  const [pendingAudioMimeType, setPendingAudioMimeType] = useState<string | null>(null);
  const [pendingAudioSizeBytes, setPendingAudioSizeBytes] = useState<number | null>(null);
  const [pendingAudioUrl, setPendingAudioUrl] = useState<string | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<MvpChatRecordingStatus>(MVP_CHAT_RECORDING_STATUSES.idle);

  useEffect(() => {
    return () => {
      stopMediaStream(mediaStreamReference.current);

      if (pendingAudioUrlReference.current !== null) {
        URL.revokeObjectURL(pendingAudioUrlReference.current);
      }
    };
  }, []);

  function clearPendingAudio() {
    if (pendingAudioUrlReference.current !== null) {
      URL.revokeObjectURL(pendingAudioUrlReference.current);
    }

    pendingAudioUrlReference.current = null;
    recordedAudioChunksReference.current = EMPTY_AUDIO_CHUNKS;
    setPendingAudioBlob(null);
    setPendingAudioMimeType(null);
    setPendingAudioSizeBytes(null);
    setPendingAudioUrl(null);
    setRecordingStatus(MVP_CHAT_RECORDING_STATUSES.idle);
  }

  async function startAudioRecording() {
    if (typeof MediaRecorder === 'undefined') {
      setAudioRecordingErrorMessage(NO_MEDIA_RECORDER_ERROR_MESSAGE);

      return;
    }

    if (typeof navigator === 'undefined' || navigator.mediaDevices === undefined) {
      setAudioRecordingErrorMessage(NO_MICROPHONE_ACCESS_ERROR_MESSAGE);

      return;
    }

    clearPendingAudio();
    setAudioRecordingErrorMessage(null);
    setRecordingStatus(MVP_CHAT_RECORDING_STATUSES.requesting);

    let requestedMediaStream: MediaStream | null = null;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(AUDIO_MEDIA_CONSTRAINTS);
      requestedMediaStream = mediaStream;
      const supportedAudioMimeType = getSupportedAudioMimeType();
      const mediaRecorderOptions: MediaRecorderOptions = {};

      if (supportedAudioMimeType.length > EMPTY_BLOB_SIZE_BYTES) {
        mediaRecorderOptions.mimeType = supportedAudioMimeType;
      }

      const mediaRecorder = new MediaRecorder(mediaStream, mediaRecorderOptions);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size === EMPTY_BLOB_SIZE_BYTES) {
          return;
        }

        recordedAudioChunksReference.current = [...recordedAudioChunksReference.current, event.data];
      });

      mediaRecorder.start();
      mediaRecorderReference.current = mediaRecorder;
      mediaStreamReference.current = mediaStream;
      recordedAudioChunksReference.current = EMPTY_AUDIO_CHUNKS;
      setRecordingStatus(MVP_CHAT_RECORDING_STATUSES.recording);
    } catch {
      stopMediaStream(requestedMediaStream);
      mediaRecorderReference.current = null;
      mediaStreamReference.current = null;
      setAudioRecordingErrorMessage(NO_MICROPHONE_ACCESS_ERROR_MESSAGE);
      setRecordingStatus(MVP_CHAT_RECORDING_STATUSES.idle);
    }
  }

  async function stopAudioRecording() {
    const mediaRecorder = mediaRecorderReference.current;
    const mediaStream = mediaStreamReference.current;

    if (mediaRecorder === null) {
      return;
    }

    await new Promise<void>((resolve) => {
      mediaRecorder.addEventListener(
        'stop',
        () => {
          const audioMimeType =
            mediaRecorder.mimeType.length > EMPTY_BLOB_SIZE_BYTES ? mediaRecorder.mimeType : EMPTY_AUDIO_MIME_TYPE;
          const audioBlob = new Blob(recordedAudioChunksReference.current, {
            type: audioMimeType,
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          stopMediaStream(mediaStream);

          mediaRecorderReference.current = null;
          mediaStreamReference.current = null;
          pendingAudioUrlReference.current = audioUrl;
          setPendingAudioBlob(audioBlob);
          setPendingAudioMimeType(audioBlob.type);
          setPendingAudioSizeBytes(audioBlob.size);
          setPendingAudioUrl(audioUrl);
          setRecordingStatus(MVP_CHAT_RECORDING_STATUSES.recorded);
          resolve();
        },
        {
          once: true,
        },
      );

      mediaRecorder.stop();
    });
  }

  return {
    audioRecordingErrorMessage,
    clearPendingAudio,
    pendingAudioBlob,
    pendingAudioMimeType,
    pendingAudioSizeBytes,
    pendingAudioUrl,
    recordingStatus,
    startAudioRecording,
    stopAudioRecording,
  };
}
