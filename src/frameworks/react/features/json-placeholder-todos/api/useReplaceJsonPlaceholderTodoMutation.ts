import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HTTP_METHODS } from '../../../api/api.consts';
import { createApiMutationOptions } from '../../../api/api-mutation-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseJsonPlaceholderTodo } from '../model/json-placeholder-todo-parsers.utils';
import type { ReplaceJsonPlaceholderTodoVariables } from '../model/json-placeholder-todo.types';

/** Полностью заменяет todo в JSONPlaceholder и обновляет кеш todo. */
export function useReplaceJsonPlaceholderTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createApiMutationOptions({
      getBody: (variables: ReplaceJsonPlaceholderTodoVariables) => {
        return variables.payload;
      },
      getRoute: (variables: ReplaceJsonPlaceholderTodoVariables) => {
        return apiRoutes.jsonPlaceholder.todo(variables.todoId);
      },
      method: API_HTTP_METHODS.put,
      parseResponse: parseJsonPlaceholderTodo,
    }),
    onSuccess: (replacedTodo) => {
      queryClient.setQueryData(queryKeys.todos.detail(replacedTodo.id), replacedTodo);
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos.lists() });
    },
  });
}
