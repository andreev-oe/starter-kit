import { z } from 'zod';

const MIN_TODO_USER_ID = 1;
const TITLE_REQUIRED_ERROR_MESSAGE = 'Title is required';
const USER_ID_REQUIRED_ERROR_MESSAGE = 'User id is required';
const USER_ID_INVALID_ERROR_MESSAGE = 'User id must be a positive number';

export const jsonPlaceholderTodoFormSchema = z.object({
  completed: z.boolean(),
  title: z.string().refine((value) => value.trim().length > 0, TITLE_REQUIRED_ERROR_MESSAGE),
  userId: z
    .string()
    .refine((value) => value.trim().length > 0, USER_ID_REQUIRED_ERROR_MESSAGE)
    .refine((value) => {
      const userId = Number(value);

      return Number.isFinite(userId) && userId >= MIN_TODO_USER_ID;
    }, USER_ID_INVALID_ERROR_MESSAGE)
    .transform(Number),
});

export type JsonPlaceholderTodoFormInput = z.input<typeof jsonPlaceholderTodoFormSchema>;

export type JsonPlaceholderTodoFormValues = z.output<typeof jsonPlaceholderTodoFormSchema>;
