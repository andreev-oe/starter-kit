import { useQuery } from '@tanstack/react-query';

import { createApiQueryOptions } from '../../../api/api-query-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseMvpChatMessageList } from '../model/mvp-chat-parsers.utils';

/** Загружает сообщения MVP-чата из локального JSON-хранилища. */
export function useMvpChatMessagesQuery() {
  return useQuery(
    createApiQueryOptions({
      parseResponse: parseMvpChatMessageList,
      queryKey: queryKeys.mvpChat.messages(),
      route: apiRoutes.mvpChat.messages(),
    }),
  );
}
