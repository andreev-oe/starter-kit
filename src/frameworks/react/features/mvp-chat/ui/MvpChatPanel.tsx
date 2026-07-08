import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { MVP_CHAT_AUTHORS } from '../model/mvp-chat.consts';
import { mvpChatMessageFormSchema } from '../model/mvp-chat-message-form.schema';
import type { MvpChatMessageFormInput, MvpChatMessageFormValues } from '../model/mvp-chat-message-form.schema';
import { useMvpChatStore } from '../model/mvp-chat.store';
import type { MvpChatAuthor } from '../model/mvp-chat.types';

const EMPTY_MESSAGE_TEXT = '';

const MVP_CHAT_MESSAGE_FIELD_NAMES = {
  text: 'text',
} as const;

const MVP_CHAT_TEXTS = {
  inputLabel: 'Сообщение',
  messageInputPlaceholder: 'Введите сообщение',
  sendButton: 'Отправить',
  title: 'Чат',
} as const;

const MVP_CHAT_MESSAGE_FORM_DEFAULT_VALUES: MvpChatMessageFormInput = {
  text: EMPTY_MESSAGE_TEXT,
};

export default function MvpChatPanel() {
  const initializeMessages = useMvpChatStore((state) => {
    return state.initializeMessages;
  });
  const isMessageSending = useMvpChatStore((state) => {
    return state.isMessageSending;
  });
  const messages = useMvpChatStore((state) => {
    return state.messages;
  });
  const sendMessage = useMvpChatStore((state) => {
    return state.sendMessage;
  });
  const { control, formState, handleSubmit, reset } = useForm<
    MvpChatMessageFormInput,
    unknown,
    MvpChatMessageFormValues
  >({
    defaultValues: MVP_CHAT_MESSAGE_FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: zodResolver(mvpChatMessageFormSchema),
  });
  const isSubmitDisabled = !formState.isValid || isMessageSending;

  useEffect(() => {
    initializeMessages();
  }, [initializeMessages]);

  const submitMessage: SubmitHandler<MvpChatMessageFormValues> = async (formValues) => {
    await sendMessage(formValues.text.trim());
    reset(MVP_CHAT_MESSAGE_FORM_DEFAULT_VALUES);
  };

  return (
    <MvpChatRoot>
      <MvpChatHeader>
        <Typography variant={'h4'}>{MVP_CHAT_TEXTS.title}</Typography>
      </MvpChatHeader>

      <MvpChatMessagesArea>
        <MvpChatMessagesStack spacing={1.5}>
          {messages.map((message) => {
            return (
              <MvpChatMessageRow key={`${message.timestamp}-${message.author}`} $messageAuthor={message.author}>
                <MvpChatMessageBubble elevation={0} $messageAuthor={message.author}>
                  <Typography variant={'body1'}>{message.payload.text}</Typography>
                </MvpChatMessageBubble>
              </MvpChatMessageRow>
            );
          })}
        </MvpChatMessagesStack>
      </MvpChatMessagesArea>

      <MvpChatForm onSubmit={handleSubmit(submitMessage)}>
        <Controller
          control={control}
          name={MVP_CHAT_MESSAGE_FIELD_NAMES.text}
          render={({ field, fieldState }) => {
            return (
              <MvpChatMessageInput
                error={Boolean(fieldState.error)}
                fullWidth={true}
                helperText={fieldState.error?.message ?? ' '}
                inputRef={field.ref}
                label={MVP_CHAT_TEXTS.inputLabel}
                name={field.name}
                placeholder={MVP_CHAT_TEXTS.messageInputPlaceholder}
                size={'small'}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            );
          }}
        />
        <Button type={'submit'} variant={'contained'} disabled={isSubmitDisabled}>
          {MVP_CHAT_TEXTS.sendButton}
        </Button>
      </MvpChatForm>
    </MvpChatRoot>
  );
}

const MvpChatRoot = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  };
});

const MvpChatHeader = styled(Box)(({ theme }) => {
  return {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
    padding: theme.spacing(2, 3),
  };
});

const MvpChatMessagesArea = styled(Box)(({ theme }) => {
  return {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: theme.spacing(3),
  };
});

const MvpChatMessagesStack = styled(Stack)(() => {
  return {
    justifyContent: 'flex-end',
    minHeight: '100%',
  };
});

const MvpChatMessageRow = styled(Box, {
  shouldForwardProp: (propertyName) => {
    return propertyName !== '$messageAuthor';
  },
})<{ $messageAuthor: MvpChatAuthor }>(({ $messageAuthor }) => {
  const isUserMessage = $messageAuthor === MVP_CHAT_AUTHORS.user;

  return {
    display: 'flex',
    justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
  };
});

const MvpChatMessageBubble = styled(Paper, {
  shouldForwardProp: (propertyName) => {
    return propertyName !== '$messageAuthor';
  },
})<{ $messageAuthor: MvpChatAuthor }>(({ $messageAuthor, theme }) => {
  const isUserMessage = $messageAuthor === MVP_CHAT_AUTHORS.user;

  return {
    backgroundColor: isUserMessage ? theme.palette.primary.main : theme.palette.background.paper,
    color: isUserMessage ? theme.palette.primary.contrastText : theme.palette.text.primary,
    maxWidth: 'min(72%, 520px)',
    padding: theme.spacing(1.25, 1.75),
  };
});

const MvpChatForm = styled('form')(({ theme }) => {
  return {
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexShrink: 0,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 3),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  };
});

const MvpChatMessageInput = styled(TextField)(() => {
  return {
    flex: 1,
  };
});
