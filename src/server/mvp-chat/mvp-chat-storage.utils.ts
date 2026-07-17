import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import {
  MVP_CHAT_AUTHORS,
  MVP_CHAT_PAYLOAD_TYPES,
} from '../../frameworks/react/features/mvp-chat/model/mvp-chat.consts';
import { INITIAL_MVP_CHAT_MESSAGES } from '../../frameworks/react/features/mvp-chat/model/mvp-chat-messages.consts';
import {
  isMvpChatMessageList,
  isRecord,
} from '../../frameworks/react/features/mvp-chat/model/mvp-chat-type-guards.utils';
import type {
  MvpChatMessage,
  SendMvpChatAudioMessageRequestBody,
  SendMvpChatTextMessageVariables,
} from '../../frameworks/react/features/mvp-chat/model/mvp-chat.types';

const MVP_CHAT_DATABASE_DIRECTORY_NAME = 'data';
const MVP_CHAT_DATABASE_SCOPE_DIRECTORY_NAME = 'mvp-chat';
const MVP_CHAT_DATABASE_FILE_NAME = 'messages.json';
const TEMPORARY_FILE_EXTENSION = '.tmp';
const FILE_ENCODING = 'utf-8';
const FILE_NOT_FOUND_ERROR_CODE = 'ENOENT';
const JSON_INDENTATION_SPACES = 2;
const RECURSIVE_DIRECTORY_CREATION = true;
const MVP_CHAT_STORAGE_READ_ERROR_MESSAGE = 'Failed to read MVP chat storage';
const MVP_CHAT_STORAGE_WRITE_ERROR_MESSAGE = 'Failed to write MVP chat storage';

const MVP_CHAT_DATABASE_FILE_PATH = join(
  process.cwd(),
  MVP_CHAT_DATABASE_DIRECTORY_NAME,
  MVP_CHAT_DATABASE_SCOPE_DIRECTORY_NAME,
  MVP_CHAT_DATABASE_FILE_NAME,
);

export class MvpChatStorageReadError extends Error {
  constructor() {
    super(MVP_CHAT_STORAGE_READ_ERROR_MESSAGE);
    this.name = MvpChatStorageReadError.name;
  }
}

export class MvpChatStorageWriteError extends Error {
  constructor() {
    super(MVP_CHAT_STORAGE_WRITE_ERROR_MESSAGE);
    this.name = MvpChatStorageWriteError.name;
  }
}

/** Читает сообщения MVP-чата из локального JSON-файла. */
export async function readMvpChatMessages() {
  try {
    return await readExistingMvpChatMessages();
  } catch (error) {
    if (!isNodeErrorWithCode(error, FILE_NOT_FOUND_ERROR_CODE)) {
      throw new MvpChatStorageReadError();
    }

    await writeMvpChatMessages(INITIAL_MVP_CHAT_MESSAGES);

    return INITIAL_MVP_CHAT_MESSAGES;
  }
}

/** Добавляет текстовое сообщение MVP-чата в локальный JSON-файл. */
export async function appendMvpChatTextMessage(variables: SendMvpChatTextMessageVariables) {
  const message: MvpChatMessage = {
    author: MVP_CHAT_AUTHORS.user,
    id: randomUUID(),
    payload: {
      text: variables.text,
      type: MVP_CHAT_PAYLOAD_TYPES.text,
    },
    timestamp: new Date().toISOString(),
  };

  await appendMvpChatMessage(message);

  return message;
}

/** Добавляет голосовое сообщение MVP-чата в локальный JSON-файл. */
export async function appendMvpChatAudioMessage(variables: SendMvpChatAudioMessageRequestBody) {
  const message: MvpChatMessage = {
    author: MVP_CHAT_AUTHORS.user,
    id: randomUUID(),
    payload: {
      base64Audio: variables.base64Audio,
      mimeType: variables.mimeType,
      sizeBytes: variables.sizeBytes,
      type: MVP_CHAT_PAYLOAD_TYPES.audio,
    },
    timestamp: new Date().toISOString(),
  };

  await appendMvpChatMessage(message);

  return message;
}

/** Проверяет, что ошибка файловой системы содержит заданный code. */
function isNodeErrorWithCode(error: unknown, errorCode: string): error is { code: string } {
  return isRecord(error) && error.code === errorCode;
}

/** Читает существующий JSON-файл сообщений MVP-чата. */
async function readExistingMvpChatMessages() {
  const databaseFileContent = await readFile(MVP_CHAT_DATABASE_FILE_PATH, FILE_ENCODING);
  const databaseContent: unknown = JSON.parse(databaseFileContent);

  if (!isMvpChatMessageList(databaseContent)) {
    throw new MvpChatStorageReadError();
  }

  return databaseContent;
}

/** Добавляет сообщение MVP-чата и сохраняет весь JSON-файл. */
async function appendMvpChatMessage(message: MvpChatMessage) {
  const messages = await readMvpChatMessages();
  const nextMessages = [...messages, message];

  await writeMvpChatMessages(nextMessages);
}

/** Атомарно записывает сообщения MVP-чата в локальный JSON-файл. */
async function writeMvpChatMessages(messages: MvpChatMessage[]) {
  try {
    await mkdir(dirname(MVP_CHAT_DATABASE_FILE_PATH), {
      recursive: RECURSIVE_DIRECTORY_CREATION,
    });

    const temporaryFilePath = `${MVP_CHAT_DATABASE_FILE_PATH}-${randomUUID()}${TEMPORARY_FILE_EXTENSION}`;
    const databaseFileContent = JSON.stringify(messages, null, JSON_INDENTATION_SPACES);

    await writeFile(temporaryFilePath, databaseFileContent, FILE_ENCODING);
    await rename(temporaryFilePath, MVP_CHAT_DATABASE_FILE_PATH);
  } catch {
    throw new MvpChatStorageWriteError();
  }
}
