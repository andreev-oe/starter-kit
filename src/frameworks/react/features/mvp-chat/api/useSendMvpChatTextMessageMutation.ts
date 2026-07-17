import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HTTP_METHODS } from '../../../api/api.consts';
import { createApiMutationOptions } from '../../../api/api-mutation-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseMvpChatMessage } from '../model/mvp-chat-parsers.utils';
import type { SendMvpChatTextMessageVariables } from '../model/mvp-chat.types';

/** Отправляет текстовое сообщение MVP-чата и инвалидирует кеш сообщений. */
export function useSendMvpChatTextMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createApiMutationOptions({
      getBody: (variables: SendMvpChatTextMessageVariables) => {
        return variables;
      },
      getRoute: () => {
        return apiRoutes.mvpChat.textMessage();
      },
      method: API_HTTP_METHODS.post,
      parseResponse: parseMvpChatMessage,
    }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.mvpChat.messages() });
    },
  });
}
