import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HTTP_METHODS } from '../../../api/api.consts';
import { createApiMutationOptions } from '../../../api/api-mutation-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseJsonPlaceholderTodo } from '../model/json-placeholder-todo-parsers.utils';
import type { UpdateJsonPlaceholderTodoVariables } from '../model/json-placeholder-todo.types';

/** Частично обновляет todo в JSONPlaceholder и обновляет кеш todo. */
export function useUpdateJsonPlaceholderTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createApiMutationOptions({
      getBody: (variables: UpdateJsonPlaceholderTodoVariables) => {
        return variables.payload;
      },
      getRoute: (variables: UpdateJsonPlaceholderTodoVariables) => {
        return apiRoutes.jsonPlaceholder.todo(variables.todoId);
      },
      method: API_HTTP_METHODS.patch,
      parseResponse: parseJsonPlaceholderTodo,
    }),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(queryKeys.todos.detail(updatedTodo.id), updatedTodo);
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos.lists() });
    },
  });
}
