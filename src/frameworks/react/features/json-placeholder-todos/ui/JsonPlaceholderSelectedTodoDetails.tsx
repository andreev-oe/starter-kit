import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useJsonPlaceholderTodoQuery } from '../api/useJsonPlaceholderTodoQuery';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';
import JsonPlaceholderTodoForm from './JsonPlaceholderTodoForm';

type JsonPlaceholderSelectedTodoDetailsProperties = {
  onDeletedTodo: () => void;
  todoId: number;
};

export default function JsonPlaceholderSelectedTodoDetails({
  onDeletedTodo,
  todoId,
}: JsonPlaceholderSelectedTodoDetailsProperties) {
  const todoQuery = useJsonPlaceholderTodoQuery(todoId);

  if (todoQuery.isPending) {
    return <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.loadingDetail}</Typography>;
  }

  if (todoQuery.isError) {
    return <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.requestError}</Typography>;
  }

  const statusLabel = todoQuery.data.completed
    ? JSON_PLACEHOLDER_TODOS_TEXTS.completedStatus
    : JSON_PLACEHOLDER_TODOS_TEXTS.pendingStatus;
  const statusColor = todoQuery.data.completed ? 'success' : 'default';

  return (
    <Stack spacing={1.5}>
      <Typography variant={'h6'}>{todoQuery.data.title}</Typography>
      <Typography variant={'body2'}>
        {`${JSON_PLACEHOLDER_TODOS_TEXTS.userIdLabel}: ${todoQuery.data.userId}`}
      </Typography>
      <Chip label={statusLabel} color={statusColor} variant={'outlined'} />
      <JsonPlaceholderTodoForm todo={todoQuery.data} onDeletedTodo={onDeletedTodo} />
    </Stack>
  );
}
