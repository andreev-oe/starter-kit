import { useLocation, useNavigate } from 'react-router';

import {
  PAGINATION_SETTINGS,
  QUERY_PARAMETER_NUMBER_SETTINGS,
  SEARCH_PARAMETER_NAMES,
  TODOS_SEARCH_PARAMETER_DEFAULTS,
  TODOS_SEARCH_PARAMETER_LIMITS,
} from '../../../shared/router/query-parameters.consts';
import {
  normalizeQueryString,
  parseQueryParameters,
  stringifyQueryParameters,
} from '../../../shared/router/query-parameters.utils';

type TodosSearchParameters = {
  limit: number;
  page: number;
  todoId: number | null;
};

type TodosSearchParameterUpdates = Partial<TodosSearchParameters>;

/** Возвращает параметры todo из query string и функции для обновления history. */
export function useJsonPlaceholderTodosSearchParameters() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParameters = getTodosSearchParameters(location.search);

  const updateSearchParameters = (updates: TodosSearchParameterUpdates) => {
    const nextSearchParameters = {
      [SEARCH_PARAMETER_NAMES.limit]: SEARCH_PARAMETER_NAMES.limit in updates ? updates.limit : searchParameters.limit,
      [SEARCH_PARAMETER_NAMES.page]: SEARCH_PARAMETER_NAMES.page in updates ? updates.page : searchParameters.page,
      [SEARCH_PARAMETER_NAMES.todoId]:
        SEARCH_PARAMETER_NAMES.todoId in updates ? updates.todoId : searchParameters.todoId,
    };

    navigate({
      search: normalizeQueryString(stringifyQueryParameters(nextSearchParameters)),
    });
  };

  const goToPreviousPage = () => {
    updateSearchParameters({
      page: Math.max(TODOS_SEARCH_PARAMETER_LIMITS.minPage, searchParameters.page - PAGINATION_SETTINGS.pageStep),
    });
  };

  const goToNextPage = () => {
    updateSearchParameters({
      page: searchParameters.page + PAGINATION_SETTINGS.pageStep,
    });
  };

  const selectTodo = (todoId: number) => {
    updateSearchParameters({ todoId });
  };

  const clearSelectedTodo = () => {
    updateSearchParameters({ todoId: null });
  };

  return {
    clearSelectedTodo,
    goToNextPage,
    goToPreviousPage,
    searchParameters,
    selectTodo,
  };
}

/** Возвращает нормализованные параметры todo из query string. */
function getTodosSearchParameters(search: string): TodosSearchParameters {
  const parsedQueryParameters = parseQueryParameters(search);

  return {
    limit: getPositiveIntegerSearchParameter(
      parsedQueryParameters[SEARCH_PARAMETER_NAMES.limit],
      TODOS_SEARCH_PARAMETER_DEFAULTS.limit,
      TODOS_SEARCH_PARAMETER_LIMITS.minLimit,
    ),
    page: getPositiveIntegerSearchParameter(
      parsedQueryParameters[SEARCH_PARAMETER_NAMES.page],
      TODOS_SEARCH_PARAMETER_DEFAULTS.page,
      TODOS_SEARCH_PARAMETER_LIMITS.minPage,
    ),
    todoId: getNullablePositiveIntegerSearchParameter(parsedQueryParameters[SEARCH_PARAMETER_NAMES.todoId]),
  };
}

/** Возвращает положительное числовое значение query parameter или fallback. */
function getPositiveIntegerSearchParameter(value: unknown, fallbackValue: number, minValue: number) {
  const parsedValue = getNullablePositiveIntegerSearchParameter(value);

  if (parsedValue === null) {
    return fallbackValue;
  }

  return Math.max(minValue, parsedValue);
}

/** Возвращает положительное числовое значение query parameter или null. */
function getNullablePositiveIntegerSearchParameter(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const parsedValue = Number.parseInt(value, QUERY_PARAMETER_NUMBER_SETTINGS.radix);

  if (!Number.isFinite(parsedValue) || parsedValue < TODOS_SEARCH_PARAMETER_LIMITS.minPage) {
    return null;
  }

  return parsedValue;
}
