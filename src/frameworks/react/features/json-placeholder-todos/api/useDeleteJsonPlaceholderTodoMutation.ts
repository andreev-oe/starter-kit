import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HTTP_METHODS } from '../../../api/api.consts';
import { createApiMutationOptions } from '../../../api/api-mutation-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseDeleteJsonPlaceholderTodoResponse } from '../model/json-placeholder-todo-parsers.utils';
import type { DeleteJsonPlaceholderTodoVariables } from '../model/json-placeholder-todo.types';

/** Удаляет todo в JSONPlaceholder и очищает связанный кеш todo. */
export function useDeleteJsonPlaceholderTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    ...createApiMutationOptions({
      getRoute: (variables: DeleteJsonPlaceholderTodoVariables) => {
        return apiRoutes.jsonPlaceholder.todo(variables.todoId);
      },
      method: API_HTTP_METHODS.delete,
      parseResponse: parseDeleteJsonPlaceholderTodoResponse,
    }),
    onSuccess: (deletedTodo, variables) => {
      void deletedTodo;

      queryClient.removeQueries({
        exact: true,
        queryKey: queryKeys.todos.detail(variables.todoId),
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.todos.lists() });
    },
  });
}
