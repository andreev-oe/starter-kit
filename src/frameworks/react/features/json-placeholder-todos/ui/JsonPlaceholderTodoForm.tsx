import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { useCreateJsonPlaceholderTodoMutation } from '../api/useCreateJsonPlaceholderTodoMutation';
import { useDeleteJsonPlaceholderTodoMutation } from '../api/useDeleteJsonPlaceholderTodoMutation';
import { useReplaceJsonPlaceholderTodoMutation } from '../api/useReplaceJsonPlaceholderTodoMutation';
import { useUpdateJsonPlaceholderTodoMutation } from '../api/useUpdateJsonPlaceholderTodoMutation';
import type { JsonPlaceholderTodo } from '../model/json-placeholder-todo.types';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';

type JsonPlaceholderTodoFormProperties = {
  onDeletedTodo: () => void;
  todo: JsonPlaceholderTodo | null;
};

export default function JsonPlaceholderTodoForm({ onDeletedTodo, todo }: JsonPlaceholderTodoFormProperties) {
  const createTodoMutation = useCreateJsonPlaceholderTodoMutation();
  const replaceTodoMutation = useReplaceJsonPlaceholderTodoMutation();
  const updateTodoMutation = useUpdateJsonPlaceholderTodoMutation();
  const deleteTodoMutation = useDeleteJsonPlaceholderTodoMutation();
  const [title, setTitle] = useState<string>(todo?.title ?? '');
  const [userId, setUserId] = useState<string>(todo === null ? '' : `${todo.userId}`);
  const [completed, setCompleted] = useState<boolean>(todo?.completed ?? false);
  const isSelectedTodo = todo !== null;
  const parsedUserId = Number(userId);
  const isFormInvalid =
    title.trim().length === 0 || userId.trim().length === 0 || !Number.isFinite(parsedUserId) || parsedUserId < 1;
  const isMutationPending =
    createTodoMutation.isPending ||
    replaceTodoMutation.isPending ||
    updateTodoMutation.isPending ||
    deleteTodoMutation.isPending;

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleCompletedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const getPayload = () => {
    return {
      completed,
      title,
      userId: parsedUserId,
    };
  };

  const handleCreateTodo = () => {
    createTodoMutation.mutate({
      payload: getPayload(),
    });
  };

  const handleReplaceTodo = () => {
    if (todo === null) {
      return;
    }

    replaceTodoMutation.mutate({
      payload: getPayload(),
      todoId: todo.id,
    });
  };

  const handlePatchTodo = () => {
    if (todo === null) {
      return;
    }

    updateTodoMutation.mutate({
      payload: getPayload(),
      todoId: todo.id,
    });
  };

  const handleDeleteTodo = () => {
    if (todo === null) {
      return;
    }

    deleteTodoMutation.mutate(
      {
        todoId: todo.id,
      },
      {
        onSuccess: onDeletedTodo,
      },
    );
  };

  return (
    <JsonPlaceholderTodoFormRoot onSubmit={handleSubmit}>
      <TextField label={JSON_PLACEHOLDER_TODOS_TEXTS.createTitleLabel} value={title} onChange={handleTitleChange} />
      <TextField
        type={'number'}
        label={JSON_PLACEHOLDER_TODOS_TEXTS.userIdLabel}
        value={userId}
        onChange={handleUserIdChange}
      />
      <FormControlLabel
        control={<Checkbox checked={completed} onChange={handleCompletedChange} />}
        label={JSON_PLACEHOLDER_TODOS_TEXTS.createCompletedLabel}
      />
      <Stack direction={'row'} spacing={1}>
        <Button
          type={'button'}
          variant={'contained'}
          disabled={isFormInvalid || isMutationPending}
          onClick={handleCreateTodo}
        >
          {JSON_PLACEHOLDER_TODOS_TEXTS.createButton}
        </Button>
        <Button
          type={'button'}
          variant={'outlined'}
          disabled={!isSelectedTodo || isFormInvalid || isMutationPending}
          onClick={handleReplaceTodo}
        >
          {JSON_PLACEHOLDER_TODOS_TEXTS.replaceButton}
        </Button>
        <Button
          type={'button'}
          variant={'outlined'}
          disabled={!isSelectedTodo || isFormInvalid || isMutationPending}
          onClick={handlePatchTodo}
        >
          {JSON_PLACEHOLDER_TODOS_TEXTS.patchButton}
        </Button>
        <Button
          type={'button'}
          color={'error'}
          variant={'outlined'}
          disabled={!isSelectedTodo || isMutationPending}
          onClick={handleDeleteTodo}
        >
          {JSON_PLACEHOLDER_TODOS_TEXTS.deleteButton}
        </Button>
      </Stack>
    </JsonPlaceholderTodoFormRoot>
  );
}

const JsonPlaceholderTodoFormRoot = styled('form')(({ theme }) => {
  return {
    display: 'grid',
    gap: theme.spacing(1),
  };
});
