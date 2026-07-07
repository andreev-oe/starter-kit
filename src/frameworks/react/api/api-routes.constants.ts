import { API_ROUTE_ROOTS, API_ROUTE_SEGMENTS } from './api.consts';

/** Возвращает корневой API route React-приложения. */
function getApiRootRoute() {
  return `${API_ROUTE_ROOTS.api}${API_ROUTE_SEGMENTS.root}`;
}

export const apiRoutes = {
  root: getApiRootRoute,
} as const;
