const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const DEFAULT_QUERY_STALE_TIME_MINUTES = 1;
const DEFAULT_QUERY_GC_TIME_MINUTES = 5;
const DEFAULT_QUERY_RETRY_COUNT = 1;

export const QUERY_KEY_ROOTS = {
  api: 'api',
  todos: 'todos',
} as const;

export const QUERY_KEY_SCOPES = {
  all: 'all',
  detail: 'detail',
  list: 'list',
  root: 'root',
} as const;

export const QUERY_STALE_TIMES = {
  default: DEFAULT_QUERY_STALE_TIME_MINUTES * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
} as const;

export const QUERY_GC_TIMES = {
  default: DEFAULT_QUERY_GC_TIME_MINUTES * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
} as const;

export const QUERY_RETRY_COUNTS = {
  default: DEFAULT_QUERY_RETRY_COUNT,
} as const;

export const QUERY_REFETCH_SETTINGS = {
  onWindowFocus: false,
} as const;

export const QUERY_DEVTOOLS_SETTINGS = {
  initialIsOpen: false,
} as const;
