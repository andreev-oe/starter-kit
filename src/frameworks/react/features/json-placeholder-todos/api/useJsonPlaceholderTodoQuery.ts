import { useQuery } from '@tanstack/react-query';

import { createApiQueryOptions } from '../../../api/api-query-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseJsonPlaceholderTodo } from '../model/json-placeholder-todo-parsers.utils';

/** Загружает одно todo из JSONPlaceholder. */
export function useJsonPlaceholderTodoQuery(todoId: number) {
  return useQuery(
    createApiQueryOptions({
      parseResponse: parseJsonPlaceholderTodo,
      queryKey: queryKeys.todos.detail(todoId),
      route: apiRoutes.jsonPlaceholder.todo(todoId),
    }),
  );
}
