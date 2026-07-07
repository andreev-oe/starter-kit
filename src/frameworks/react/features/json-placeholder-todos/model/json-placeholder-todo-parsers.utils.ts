import { API_ERROR_MESSAGES } from '../../../api/api.consts';
import { isJsonPlaceholderTodo, isJsonPlaceholderTodoList } from './json-placeholder-todo-type-guards.utils';

/** Возвращает типизированный todo из ответа JSONPlaceholder. */
export function parseJsonPlaceholderTodo(responseBody: unknown) {
  if (!isJsonPlaceholderTodo(responseBody)) {
    throw new Error(API_ERROR_MESSAGES.invalidResponse);
  }

  return responseBody;
}

/** Возвращает типизированный список todo из ответа JSONPlaceholder. */
export function parseJsonPlaceholderTodoList(responseBody: unknown) {
  if (!isJsonPlaceholderTodoList(responseBody)) {
    throw new Error(API_ERROR_MESSAGES.invalidResponse);
  }

  return responseBody;
}

/** Возвращает результат удаления todo из ответа JSONPlaceholder. */
export function parseDeleteJsonPlaceholderTodoResponse() {
  return null;
}
