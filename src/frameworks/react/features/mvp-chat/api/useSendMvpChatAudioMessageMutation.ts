import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestApi } from '../../../api/api-client';
import { API_HTTP_METHODS } from '../../../api/api.consts';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { convertMvpChatAudioBlobToBase64 } from '../model/mvp-chat-audio.utils';
import { parseMvpChatMessage } from '../model/mvp-chat-parsers.utils';
import type { SendMvpChatAudioMessageRequestBody, SendMvpChatAudioMessageVariables } from '../model/mvp-chat.types';

/** Отправляет голосовое сообщение MVP-чата и инвалидирует кеш сообщений. */
export function useSendMvpChatAudioMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SendMvpChatAudioMessageVariables) => {
      const base64Audio = await convertMvpChatAudioBlobToBase64(variables.audioBlob);
      const requestBody: SendMvpChatAudioMessageRequestBody = {
        base64Audio,
        mimeType: variables.mimeType,
        sizeBytes: variables.sizeBytes,
      };

      return requestApi({
        body: requestBody,
        method: API_HTTP_METHODS.post,
        parseResponse: parseMvpChatMessage,
        route: apiRoutes.mvpChat.audioMessage(),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.mvpChat.messages() });
    },
  });
}
