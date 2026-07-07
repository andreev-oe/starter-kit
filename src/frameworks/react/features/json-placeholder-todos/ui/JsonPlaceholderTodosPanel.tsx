import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import ReactThemeModeToggle from '../../../theme/ReactThemeModeToggle';
import { useJsonPlaceholderTodosQuery } from '../api/useJsonPlaceholderTodosQuery';
import type { JsonPlaceholderTodo } from '../model/json-placeholder-todo.types';
import { useJsonPlaceholderTodosSearchParameters } from '../model/useJsonPlaceholderTodosSearchParameters';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';
import JsonPlaceholderTodoDetails from './JsonPlaceholderTodoDetails';
import JsonPlaceholderTodosList from './JsonPlaceholderTodosList';
import JsonPlaceholderTodosPagination from './JsonPlaceholderTodosPagination';

const EMPTY_JSON_PLACEHOLDER_TODOS: JsonPlaceholderTodo[] = [];

export default function JsonPlaceholderTodosPanel() {
  const { clearSelectedTodo, goToNextPage, goToPreviousPage, searchParameters, selectTodo } =
    useJsonPlaceholderTodosSearchParameters();
  const todosQuery = useJsonPlaceholderTodosQuery({
    limit: searchParameters.limit,
    page: searchParameters.page,
  });
  const todos = todosQuery.data ?? EMPTY_JSON_PLACEHOLDER_TODOS;

  return (
    <JsonPlaceholderTodosRoot>
      <Stack spacing={3}>
        <JsonPlaceholderTodosHeader>
          <Stack spacing={0.5}>
            <Typography variant={'h4'}>{JSON_PLACEHOLDER_TODOS_TEXTS.panelTitle}</Typography>
            <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.refreshHint}</Typography>
          </Stack>
          <ReactThemeModeToggle />
        </JsonPlaceholderTodosHeader>

        <JsonPlaceholderTodosGrid>
          <JsonPlaceholderTodosSection>
            <Stack spacing={2}>
              <Typography variant={'h6'}>{JSON_PLACEHOLDER_TODOS_TEXTS.todosListTitle}</Typography>
              <JsonPlaceholderTodosPagination
                page={searchParameters.page}
                isFetching={todosQuery.isFetching}
                onPreviousPage={goToPreviousPage}
                onNextPage={goToNextPage}
              />
              {todosQuery.isPending && (
                <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.loadingList}</Typography>
              )}
              {todosQuery.isError && (
                <Typography variant={'body2'}>{JSON_PLACEHOLDER_TODOS_TEXTS.requestError}</Typography>
              )}
              {todosQuery.isSuccess && (
                <JsonPlaceholderTodosList
                  todos={todos}
                  selectedTodoId={searchParameters.todoId}
                  onSelectTodo={selectTodo}
                />
              )}
            </Stack>
          </JsonPlaceholderTodosSection>

          <JsonPlaceholderTodosSection>
            <Stack spacing={2}>
              <Typography variant={'h6'}>{JSON_PLACEHOLDER_TODOS_TEXTS.selectedTodoTitle}</Typography>
              <JsonPlaceholderTodoDetails todoId={searchParameters.todoId} onDeletedTodo={clearSelectedTodo} />
            </Stack>
          </JsonPlaceholderTodosSection>
        </JsonPlaceholderTodosGrid>
      </Stack>
    </JsonPlaceholderTodosRoot>
  );
}

const JsonPlaceholderTodosRoot = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(3),
    width: '100%',
  };
});

const JsonPlaceholderTodosHeader = styled(Box)(({ theme }) => {
  return {
    alignItems: 'flex-start',
    display: 'flex',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  };
});

const JsonPlaceholderTodosGrid = styled(Box)(({ theme }) => {
  return {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(280px, 1fr)',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  };
});

const JsonPlaceholderTodosSection = styled(Box)(({ theme }) => {
  return {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  };
});
