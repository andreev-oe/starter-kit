import Typography from '@mui/material/Typography';

import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';
import JsonPlaceholderTodoForm from './JsonPlaceholderTodoForm';
import JsonPlaceholderSelectedTodoDetails from './JsonPlaceholderSelectedTodoDetails';

type JsonPlaceholderTodoDetailsProperties = {
  onDeletedTodo: () => void;
  todoId: number | null;
};

export default function JsonPlaceholderTodoDetails({ onDeletedTodo, todoId }: JsonPlaceholderTodoDetailsProperties) {
  if (todoId === null) {
    return (
      <>
        <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.noSelectedTodo}</Typography>
        <JsonPlaceholderTodoForm todo={null} onDeletedTodo={onDeletedTodo} />
      </>
    );
  }

  return <JsonPlaceholderSelectedTodoDetails todoId={todoId} onDeletedTodo={onDeletedTodo} />;
}
