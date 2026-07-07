import { useQuery } from '@tanstack/react-query';

import { createApiQueryOptions } from '../../../api/api-query-options';
import { apiRoutes } from '../../../api/api-routes';
import { queryKeys } from '../../../api/query-keys';
import { parseJsonPlaceholderTodoList } from '../model/json-placeholder-todo-parsers.utils';
import type { JsonPlaceholderTodosQueryParameters } from '../model/json-placeholder-todo.types';

/** Загружает список todo из JSONPlaceholder с учетом пагинации. */
export function useJsonPlaceholderTodosQuery(parameters: JsonPlaceholderTodosQueryParameters) {
  return useQuery(
    createApiQueryOptions({
      parseResponse: parseJsonPlaceholderTodoList,
      queryKey: queryKeys.todos.list(parameters),
      route: apiRoutes.jsonPlaceholder.todos(parameters),
    }),
  );
}
