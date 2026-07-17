import type { MvpChatAudioPayload } from './mvp-chat.types';

const MVP_CHAT_AUDIO_DATA_URL_PREFIX = 'data:';
const MVP_CHAT_AUDIO_DATA_URL_BASE64_SEPARATOR = ';base64,';
const MVP_CHAT_DATA_URL_PAYLOAD_SEPARATOR = ',';
const MISSING_SEPARATOR_INDEX = -1;
const AUDIO_BLOB_READ_RESULT_ERROR_MESSAGE = 'Audio blob read result is not a string';
const AUDIO_BLOB_READ_FAILED_ERROR_MESSAGE = 'Audio blob read failed';

/** Возвращает data URL для воспроизведения base64-аудио сообщения MVP-чата. */
export function getMvpChatAudioDataUrl(audioPayload: MvpChatAudioPayload) {
  return `${MVP_CHAT_AUDIO_DATA_URL_PREFIX}${audioPayload.mimeType}${MVP_CHAT_AUDIO_DATA_URL_BASE64_SEPARATOR}${audioPayload.base64Audio}`;
}

/** Конвертирует Blob аудиозаписи в base64-строку без data URL prefix. */
export async function convertMvpChatAudioBlobToBase64(audioBlob: Blob) {
  const audioDataUrl = await readMvpChatAudioBlobAsDataUrl(audioBlob);
  const payloadSeparatorIndex = audioDataUrl.indexOf(MVP_CHAT_DATA_URL_PAYLOAD_SEPARATOR);

  if (payloadSeparatorIndex === MISSING_SEPARATOR_INDEX) {
    return audioDataUrl;
  }

  return audioDataUrl.slice(payloadSeparatorIndex + MVP_CHAT_DATA_URL_PAYLOAD_SEPARATOR.length);
}

/** Читает Blob аудиозаписи как data URL. */
function readMvpChatAudioBlobAsDataUrl(audioBlob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);

        return;
      }

      reject(new Error(AUDIO_BLOB_READ_RESULT_ERROR_MESSAGE));
    });
    fileReader.addEventListener('error', () => {
      reject(fileReader.error ?? new Error(AUDIO_BLOB_READ_FAILED_ERROR_MESSAGE));
    });
    fileReader.readAsDataURL(audioBlob);
  });
}
