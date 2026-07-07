import { QueryClient } from '@tanstack/react-query';

import {
  QUERY_GC_TIMES,
  QUERY_REFETCH_SETTINGS,
  QUERY_RETRY_COUNTS,
  QUERY_STALE_TIMES,
} from './query.consts';

/** Создает единый QueryClient для React-части приложения. */
function createReactQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: QUERY_GC_TIMES.default,
        refetchOnWindowFocus: QUERY_REFETCH_SETTINGS.onWindowFocus,
        retry: QUERY_RETRY_COUNTS.default,
        staleTime: QUERY_STALE_TIMES.default,
      },
    },
  });
}

export const reactQueryClient = createReactQueryClient();
