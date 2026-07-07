export type JsonPlaceholderTodo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export type JsonPlaceholderTodosQueryParameters = {
  limit: number;
  page: number;
};

export type CreateJsonPlaceholderTodoPayload = {
  completed: boolean;
  title: string;
  userId: number;
};

export type ReplaceJsonPlaceholderTodoPayload = CreateJsonPlaceholderTodoPayload;

export type UpdateJsonPlaceholderTodoPayload = Partial<CreateJsonPlaceholderTodoPayload>;

export type CreateJsonPlaceholderTodoVariables = {
  payload: CreateJsonPlaceholderTodoPayload;
};

export type ReplaceJsonPlaceholderTodoVariables = {
  payload: ReplaceJsonPlaceholderTodoPayload;
  todoId: number;
};

export type UpdateJsonPlaceholderTodoVariables = {
  payload: UpdateJsonPlaceholderTodoPayload;
  todoId: number;
};

export type DeleteJsonPlaceholderTodoVariables = {
  todoId: number;
};
