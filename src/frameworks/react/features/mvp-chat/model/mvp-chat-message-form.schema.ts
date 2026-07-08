import { z } from 'zod';

const MESSAGE_TEXT_REQUIRED_ERROR_MESSAGE = 'Введите сообщение';

export const mvpChatMessageFormSchema = z.object({
  text: z.string().refine((value) => {
    return value.trim().length > 0;
  }, MESSAGE_TEXT_REQUIRED_ERROR_MESSAGE),
});

export type MvpChatMessageFormInput = z.input<typeof mvpChatMessageFormSchema>;

export type MvpChatMessageFormValues = z.output<typeof mvpChatMessageFormSchema>;
