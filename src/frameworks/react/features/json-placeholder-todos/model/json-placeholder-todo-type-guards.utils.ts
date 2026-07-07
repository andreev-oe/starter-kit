import { JSON_PLACEHOLDER_TODO_FIELD_NAMES } from './json-placeholder-todo.consts';
import type { JsonPlaceholderTodo } from './json-placeholder-todo.types';

/** Проверяет, что значение является объектом с ключами. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

/** Проверяет, что значение является todo из JSONPlaceholder. */
export function isJsonPlaceholderTodo(value: unknown): value is JsonPlaceholderTodo {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value[JSON_PLACEHOLDER_TODO_FIELD_NAMES.completed] === 'boolean' &&
    typeof value[JSON_PLACEHOLDER_TODO_FIELD_NAMES.id] === 'number' &&
    typeof value[JSON_PLACEHOLDER_TODO_FIELD_NAMES.title] === 'string' &&
    typeof value[JSON_PLACEHOLDER_TODO_FIELD_NAMES.userId] === 'number'
  );
}

/** Проверяет, что значение является списком todo из JSONPlaceholder. */
export function isJsonPlaceholderTodoList(value: unknown): value is JsonPlaceholderTodo[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((todo) => isJsonPlaceholderTodo(todo));
}
