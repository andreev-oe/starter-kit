import { z } from 'zod';

export const mvpChatMessageFormSchema = z.object({
  text: z.string(),
});

export type MvpChatMessageFormInput = z.input<typeof mvpChatMessageFormSchema>;

export type MvpChatMessageFormValues = z.output<typeof mvpChatMessageFormSchema>;
