import type { JsonPlaceholderTodoFormInput } from './json-placeholder-todo-form.schema';
import type { JsonPlaceholderTodo } from './json-placeholder-todo.types';

const EMPTY_TODO_TITLE = '';
const EMPTY_TODO_USER_ID = '';

/** Возвращает значения формы todo для выбранного todo или пустой формы создания. */
export function getJsonPlaceholderTodoFormDefaultValues(
  todo: JsonPlaceholderTodo | null,
): JsonPlaceholderTodoFormInput {
  return {
    completed: todo?.completed ?? false,
    title: todo?.title ?? EMPTY_TODO_TITLE,
    userId: todo === null ? EMPTY_TODO_USER_ID : `${todo.userId}`,
  };
}
