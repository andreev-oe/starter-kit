import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { TODOS_SEARCH_PARAMETER_LIMITS } from '../../../shared/router/query-parameters.consts';
import { JSON_PLACEHOLDER_TODOS_TEXTS } from './json-placeholder-todos-ui.consts';

type JsonPlaceholderTodosPaginationProperties = {
  isFetching: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
};

export default function JsonPlaceholderTodosPagination({
  isFetching,
  onNextPage,
  onPreviousPage,
  page,
}: JsonPlaceholderTodosPaginationProperties) {
  const isPreviousButtonDisabled = page <= TODOS_SEARCH_PARAMETER_LIMITS.minPage || isFetching;

  return (
    <JsonPlaceholderTodosPaginationRoot direction={'row'} spacing={1}>
      <Button type={'button'} variant={'outlined'} disabled={isPreviousButtonDisabled} onClick={onPreviousPage}>
        {JSON_PLACEHOLDER_TODOS_TEXTS.previousPage}
      </Button>
      <Typography variant={'body2'}>{`${JSON_PLACEHOLDER_TODOS_TEXTS.pageLabel}: ${page}`}</Typography>
      <Button type={'button'} variant={'outlined'} disabled={isFetching} onClick={onNextPage}>
        {JSON_PLACEHOLDER_TODOS_TEXTS.nextPage}
      </Button>
    </JsonPlaceholderTodosPaginationRoot>
  );
}

const JsonPlaceholderTodosPaginationRoot = styled(Stack)(() => {
  return {
    alignItems: 'center',
  };
});
