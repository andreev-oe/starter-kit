import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

import { QUERY_DEVTOOLS_SETTINGS } from '../api/query.consts';
import { reactQueryClient } from '../api/query-client';

type ReactQueryProviderProperties = {
  children: ReactNode;
};

/** Подключает TanStack Query provider для React-части приложения. */
export default function ReactQueryProvider({ children }: ReactQueryProviderProperties) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={QUERY_DEVTOOLS_SETTINGS.initialIsOpen} />
    </QueryClientProvider>
  );
}
