import { QUERY_KEY_ROOTS, QUERY_KEY_SCOPES } from './query.consts';

/** Возвращает корневой query key для полного API-кеша React-приложения. */
function getApiRootQueryKey() {
  return [QUERY_KEY_ROOTS.api, QUERY_KEY_SCOPES.root] as const;
}

export const queryKeys = {
  api: {
    root: getApiRootQueryKey,
  },
} as const;
