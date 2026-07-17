import { stringifyQueryParameters } from '../shared/router/query-parameters.utils';
import { API_BASE_URLS, API_QUERY_PARAMETER_NAMES, API_ROUTE_SEGMENTS } from './api.consts';

type TodoListRouteParameters = {
  limit: number;
  page: number;
};

const ROUTE_SEPARATOR = '/';

/** Возвращает route для списка JSONPlaceholder todo. */
function getJsonPlaceholderTodosRouteWithoutParameters() {
  return `${API_BASE_URLS.jsonPlaceholder}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.todos}`;
}

/** Возвращает route для сообщений MVP-чата. */
function getMvpChatMessagesRoute() {
  return `${API_BASE_URLS.local}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.api}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.mvpChat}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.messages}`;
}

/** Возвращает route для отправки текстового сообщения MVP-чата. */
function getMvpChatTextMessageRoute() {
  return `${getMvpChatMessagesRoute()}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.text}`;
}

/** Возвращает route для отправки аудио сообщения MVP-чата. */
function getMvpChatAudioMessageRoute() {
  return `${getMvpChatMessagesRoute()}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.audio}`;
}

/** Возвращает route для списка JSONPlaceholder todo с query parameters. */
function getJsonPlaceholderTodosRoute(parameters: TodoListRouteParameters) {
  const queryString = stringifyQueryParameters({
    [API_QUERY_PARAMETER_NAMES.limit]: parameters.limit,
    [API_QUERY_PARAMETER_NAMES.page]: parameters.page,
  });

  return `${API_BASE_URLS.jsonPlaceholder}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.todos}${queryString}`;
}

/** Возвращает route для одного JSONPlaceholder todo. */
function getJsonPlaceholderTodoRoute(todoId: number) {
  return `${API_BASE_URLS.jsonPlaceholder}${ROUTE_SEPARATOR}${API_ROUTE_SEGMENTS.todos}${ROUTE_SEPARATOR}${todoId}`;
}

export const apiRoutes = {
  jsonPlaceholder: {
    todo: getJsonPlaceholderTodoRoute,
    todos: getJsonPlaceholderTodosRoute,
    todosWithoutParameters: getJsonPlaceholderTodosRouteWithoutParameters,
  },
  mvpChat: {
    audioMessage: getMvpChatAudioMessageRoute,
    messages: getMvpChatMessagesRoute,
    textMessage: getMvpChatTextMessageRoute,
  },
} as const;
