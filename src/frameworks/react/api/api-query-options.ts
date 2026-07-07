import { queryOptions } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

import { API_HTTP_METHODS } from './api.consts';
import { requestApi } from './api-client';
import { QUERY_GC_TIMES, QUERY_STALE_TIMES } from './query.consts';

type ApiQueryOptionsParameters<ResponseData, CurrentQueryKey extends QueryKey> = {
  gcTime?: number;
  parseResponse: (responseBody: unknown) => ResponseData;
  queryKey: CurrentQueryKey;
  route: string;
  staleTime?: number;
};

/** Создает query options для GET-запроса через единый API client. */
export function createApiQueryOptions<ResponseData, CurrentQueryKey extends QueryKey>(
  parameters: ApiQueryOptionsParameters<ResponseData, CurrentQueryKey>,
) {
  return queryOptions({
    gcTime: parameters.gcTime ?? QUERY_GC_TIMES.default,
    queryFn: ({ signal }) => {
      return requestApi<ResponseData>({
        method: API_HTTP_METHODS.get,
        parseResponse: parameters.parseResponse,
        route: parameters.route,
        signal,
      });
    },
    queryKey: parameters.queryKey,
    staleTime: parameters.staleTime ?? QUERY_STALE_TIMES.default,
  });
}
