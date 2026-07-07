import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import type { JsonPlaceholderTodo } from '../model/json-placeholder-todo.types';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';
import JsonPlaceholderTodoListItem from './JsonPlaceholderTodoListItem';

type JsonPlaceholderTodosListProperties = {
  onSelectTodo: (todoId: number) => void;
  selectedTodoId: number | null;
  todos: JsonPlaceholderTodo[];
};

export default function JsonPlaceholderTodosList({
  onSelectTodo,
  selectedTodoId,
  todos,
}: JsonPlaceholderTodosListProperties) {
  if (todos.length === 0) {
    return <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.emptyList}</Typography>;
  }

  return (
    <List disablePadding={true}>
      {todos.map((todo) => (
        <JsonPlaceholderTodoListItem
          key={todo.id}
          todo={todo}
          isSelected={todo.id === selectedTodoId}
          onSelectTodo={onSelectTodo}
        />
      ))}
    </List>
  );
}
