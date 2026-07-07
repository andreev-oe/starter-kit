import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import type { JsonPlaceholderTodo } from '../model/json-placeholder-todo.types';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';

type JsonPlaceholderTodoListItemProperties = {
  isSelected: boolean;
  onSelectTodo: (todoId: number) => void;
  todo: JsonPlaceholderTodo;
};

export default function JsonPlaceholderTodoListItem({
  isSelected,
  onSelectTodo,
  todo,
}: JsonPlaceholderTodoListItemProperties) {
  const statusLabel = todo.completed
    ? JSON_PLACEHOLDER_TODOS_TEXTS.completedStatus
    : JSON_PLACEHOLDER_TODOS_TEXTS.pendingStatus;
  const statusColor = todo.completed ? 'success' : 'default';

  const handleClick = () => {
    onSelectTodo(todo.id);
  };

  return (
    <ListItem disablePadding={true}>
      <ListItemButton selected={isSelected} onClick={handleClick}>
        <JsonPlaceholderTodoListItemContent direction={'row'} spacing={0.5}>
          <ListItemText
            primary={todo.title}
            secondary={`${JSON_PLACEHOLDER_TODOS_TEXTS.userIdLabel}: ${todo.userId}`}
          />
          <FixedWidthChip label={statusLabel} color={statusColor} variant={'outlined'} />
        </JsonPlaceholderTodoListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

const JsonPlaceholderTodoListItemContent = styled(Stack)(() => {
  return {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  };
});

const FixedWidthChip = styled(Chip)(() => {
  return {
    minWidth: '80px'
  };
});
