import { QUERY_KEY_ROOTS, QUERY_KEY_SCOPES } from './query.consts';

type TodosListQueryKeyParameters = {
  limit: number;
  page: number;
};

/** Возвращает корневой query key для полного API-кеша React-приложения. */
function getApiRootQueryKey() {
  return [QUERY_KEY_ROOTS.api, QUERY_KEY_SCOPES.root] as const;
}

/** Возвращает query key для всего домена todo. */
function getTodosAllQueryKey() {
  return [QUERY_KEY_ROOTS.todos, QUERY_KEY_SCOPES.all] as const;
}

/** Возвращает query key для всех списков todo. */
function getTodosListsQueryKey() {
  return [QUERY_KEY_ROOTS.todos, QUERY_KEY_SCOPES.list] as const;
}

/** Возвращает query key для списка todo с учетом параметров пагинации. */
function getTodosListQueryKey(parameters: TodosListQueryKeyParameters) {
  return [...getTodosListsQueryKey(), parameters] as const;
}

/** Возвращает query key для одного todo. */
function getTodoDetailQueryKey(todoId: number) {
  return [QUERY_KEY_ROOTS.todos, QUERY_KEY_SCOPES.detail, todoId] as const;
}

export const queryKeys = {
  api: {
    root: getApiRootQueryKey,
  },
  todos: {
    all: getTodosAllQueryKey,
    detail: getTodoDetailQueryKey,
    list: getTodosListQueryKey,
    lists: getTodosListsQueryKey,
  },
} as const;
