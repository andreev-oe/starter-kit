export const REACT_ROUTER_BASENAME = '/react';

export const REACT_ROUTE_PATH_SEPARATOR = '/';

export const REACT_ROUTE_SEGMENTS = {
  todo: 'todo',
  welcome: 'welcome',
} as const;

export const REACT_ROUTE_PATHS = {
  fallback: '*',
  home: REACT_ROUTE_PATH_SEPARATOR,
  todo: `${REACT_ROUTE_PATH_SEPARATOR}${REACT_ROUTE_SEGMENTS.todo}`,
  welcome: `${REACT_ROUTE_PATH_SEPARATOR}${REACT_ROUTE_SEGMENTS.welcome}`,
} as const;
