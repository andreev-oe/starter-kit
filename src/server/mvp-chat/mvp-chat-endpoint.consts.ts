export const MVP_CHAT_ENDPOINT_ERROR_RESPONSES = {
  invalidRequestBody: {
    message: 'Invalid MVP chat request body',
  },
  readFailed: {
    message: 'Failed to read MVP chat messages',
  },
  writeFailed: {
    message: 'Failed to write MVP chat message',
  },
} as const;
