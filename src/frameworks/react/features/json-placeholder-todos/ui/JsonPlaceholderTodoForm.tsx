import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { ChangeEvent } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { useCreateJsonPlaceholderTodoMutation } from '../api/useCreateJsonPlaceholderTodoMutation';
import { useDeleteJsonPlaceholderTodoMutation } from '../api/useDeleteJsonPlaceholderTodoMutation';
import { useReplaceJsonPlaceholderTodoMutation } from '../api/useReplaceJsonPlaceholderTodoMutation';
import { useUpdateJsonPlaceholderTodoMutation } from '../api/useUpdateJsonPlaceholderTodoMutation';
import { jsonPlaceholderTodoFormSchema } from '../model/json-placeholder-todo-form.schema';
import type {
  JsonPlaceholderTodoFormInput,
  JsonPlaceholderTodoFormValues,
} from '../model/json-placeholder-todo-form.schema';
import { getJsonPlaceholderTodoFormDefaultValues } from '../model/json-placeholder-todo-form.utils';
import type { JsonPlaceholderTodo } from '../model/json-placeholder-todo.types';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';

const TODO_FORM_FIELD_NAMES = {
  completed: 'completed',
  title: 'title',
  userId: 'userId',
} as const;

type JsonPlaceholderTodoFormProperties = {
  onDeletedTodo: () => void;
  todo: JsonPlaceholderTodo | null;
};

export default function JsonPlaceholderTodoForm({ onDeletedTodo, todo }: JsonPlaceholderTodoFormProperties) {
  const createTodoMutation = useCreateJsonPlaceholderTodoMutation();
  const replaceTodoMutation = useReplaceJsonPlaceholderTodoMutation();
  const updateTodoMutation = useUpdateJsonPlaceholderTodoMutation();
  const deleteTodoMutation = useDeleteJsonPlaceholderTodoMutation();
  const { control, formState, handleSubmit, reset } = useForm<
    JsonPlaceholderTodoFormInput,
    unknown,
    JsonPlaceholderTodoFormValues
  >({
    defaultValues: getJsonPlaceholderTodoFormDefaultValues(todo),
    mode: 'onChange',
    resolver: zodResolver(jsonPlaceholderTodoFormSchema),
  });
  const isSelectedTodo = todo !== null;
  const isFormInvalid = !formState.isValid;
  const isMutationPending =
    createTodoMutation.isPending ||
    replaceTodoMutation.isPending ||
    updateTodoMutation.isPending ||
    deleteTodoMutation.isPending;

  useEffect(() => {
    reset(getJsonPlaceholderTodoFormDefaultValues(todo));
  }, [reset, todo]);

  const submitCreateTodo: SubmitHandler<JsonPlaceholderTodoFormValues> = (formValues) => {
    createTodoMutation.mutate({
      payload: formValues,
    });
  };

  const handleCreateTodo = () => {
    void handleSubmit(submitCreateTodo)();
  };

  const submitReplaceTodo: SubmitHandler<JsonPlaceholderTodoFormValues> = (formValues) => {
    if (todo === null) {
      return;
    }

    replaceTodoMutation.mutate({
      payload: formValues,
      todoId: todo.id,
    });
  };

  const handleReplaceTodo = () => {
    void handleSubmit(submitReplaceTodo)();
  };

  const submitPatchTodo: SubmitHandler<JsonPlaceholderTodoFormValues> = (formValues) => {
    if (todo === null) {
      return;
    }

    updateTodoMutation.mutate({
      payload: formValues,
      todoId: todo.id,
    });
  };

  const handlePatchTodo = () => {
    void handleSubmit(submitPatchTodo)();
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
    <JsonPlaceholderTodoFormRoot>
      <Controller
        control={control}
        name={TODO_FORM_FIELD_NAMES.title}
        render={({ field, fieldState }) => {
          return (
            <TextField
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ' '}
              inputRef={field.ref}
              label={JSON_PLACEHOLDER_TODOS_TEXTS.createTitleLabel}
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={TODO_FORM_FIELD_NAMES.userId}
        render={({ field, fieldState }) => {
          return (
            <TextField
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message ?? ' '}
              inputRef={field.ref}
              label={JSON_PLACEHOLDER_TODOS_TEXTS.userIdLabel}
              name={field.name}
              type={'number'}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
            />
          );
        }}
      />
      <Controller
        control={control}
        name={TODO_FORM_FIELD_NAMES.completed}
        render={({ field }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
              label={JSON_PLACEHOLDER_TODOS_TEXTS.createCompletedLabel}
            />
          );
        }}
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
