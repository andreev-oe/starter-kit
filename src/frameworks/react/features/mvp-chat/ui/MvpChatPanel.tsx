import type { FormEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const MVP_CHAT_AUTHORS = {
  companion: 'companion',
  user: 'user',
} as const;

const MVP_CHAT_TEXTS = {
  inputLabel: 'Сообщение',
  messageInputPlaceholder: 'Введите сообщение',
  sendButton: 'Отправить',
  title: 'Чат',
} as const;

const MVP_CHAT_MESSAGES = [
  {
    author: MVP_CHAT_AUTHORS.companion,
    id: 'welcome-message',
    text: 'Привет. Чем могу помочь?',
  },
  {
    author: MVP_CHAT_AUTHORS.user,
    id: 'user-message',
    text: 'Нужно быстро собрать MVP чата.',
  },
  {
    author: MVP_CHAT_AUTHORS.companion,
    id: 'companion-message',
    text: 'Готово, оставим простую структуру с полем ввода.',
  },
] as const;

type MvpChatAuthor = (typeof MVP_CHAT_AUTHORS)[keyof typeof MVP_CHAT_AUTHORS];

export default function MvpChatPanel() {
  function handleChatFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <MvpChatRoot>
      <MvpChatHeader>
        <Typography variant={'h4'}>{MVP_CHAT_TEXTS.title}</Typography>
      </MvpChatHeader>

      <MvpChatMessagesArea>
        <MvpChatMessagesStack spacing={1.5}>
          {MVP_CHAT_MESSAGES.map((message) => {
            return (
              <MvpChatMessageRow key={message.id} $messageAuthor={message.author}>
                <MvpChatMessageBubble elevation={0} $messageAuthor={message.author}>
                  <Typography variant={'body1'}>{message.text}</Typography>
                </MvpChatMessageBubble>
              </MvpChatMessageRow>
            );
          })}
        </MvpChatMessagesStack>
      </MvpChatMessagesArea>

      <MvpChatForm component={'form'} onSubmit={handleChatFormSubmit}>
        <MvpChatMessageInput
          fullWidth={true}
          label={MVP_CHAT_TEXTS.inputLabel}
          placeholder={MVP_CHAT_TEXTS.messageInputPlaceholder}
          size={'small'}
        />
        <Button type={'submit'} variant={'contained'}>
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

const MvpChatForm = styled(Box)(({ theme }) => {
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
