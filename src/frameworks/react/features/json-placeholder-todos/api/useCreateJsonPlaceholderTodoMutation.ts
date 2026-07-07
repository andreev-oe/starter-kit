import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HTTP_METHODS } from '../../../api/api.consts';
import { createApiMutationOptions } from '../../../api/api-mutation-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseJsonPlaceholderTodo } from '../model/json-placeholder-todo-parsers.utils';
import type { CreateJsonPlaceholderTodoVariables } from '../model/json-placeholder-todo.types';

/** Создает todo в JSONPlaceholder и инвалидирует списки todo. */
export function useCreateJsonPlaceholderTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createApiMutationOptions({
      getBody: (variables: CreateJsonPlaceholderTodoVariables) => {
        return variables.payload;
      },
      getRoute: () => {
        return apiRoutes.jsonPlaceholder.todosWithoutParameters();
      },
      method: API_HTTP_METHODS.post,
      parseResponse: parseJsonPlaceholderTodo,
    }),
    onSuccess: (createdTodo) => {
      queryClient.setQueryData(queryKeys.todos.detail(createdTodo.id), createdTodo);
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos.lists() });
    },
  });
}
