import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { MVP_CHAT_AUTHORS, MVP_CHAT_PAYLOAD_TYPES, MVP_CHAT_RECORDING_STATUSES } from '../model/mvp-chat.consts';
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
  pendingAudioLabel: 'Голосовое сообщение готово',
  recordButton: 'Записать',
  replaceAudioButton: 'Перезаписать',
  sendButton: 'Отправить',
  stopRecordButton: 'Остановить',
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
  const pendingAudioUrl = useMvpChatStore((state) => {
    return state.pendingAudioUrl;
  });
  const recordingStatus = useMvpChatStore((state) => {
    return state.recordingStatus;
  });
  const audioRecordingErrorMessage = useMvpChatStore((state) => {
    return state.audioRecordingErrorMessage;
  });
  const sendMessage = useMvpChatStore((state) => {
    return state.sendMessage;
  });
  const startAudioRecording = useMvpChatStore((state) => {
    return state.startAudioRecording;
  });
  const stopAudioRecording = useMvpChatStore((state) => {
    return state.stopAudioRecording;
  });
  const { control, handleSubmit, reset } = useForm<MvpChatMessageFormInput, unknown, MvpChatMessageFormValues>({
    defaultValues: MVP_CHAT_MESSAGE_FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: zodResolver(mvpChatMessageFormSchema),
  });
  const messageText = useWatch({
    control,
    name: MVP_CHAT_MESSAGE_FIELD_NAMES.text,
  });
  const hasMessageText = messageText.trim().length > 0;
  const hasPendingAudio = pendingAudioUrl !== null;
  const isRecording = recordingStatus === MVP_CHAT_RECORDING_STATUSES.recording;
  const isMicrophoneRequesting = recordingStatus === MVP_CHAT_RECORDING_STATUSES.requesting;
  const isSubmitDisabled =
    (!hasMessageText && !hasPendingAudio) || isMessageSending || isRecording || isMicrophoneRequesting;
  const recordButtonText = isRecording
    ? MVP_CHAT_TEXTS.stopRecordButton
    : hasPendingAudio
      ? MVP_CHAT_TEXTS.replaceAudioButton
      : MVP_CHAT_TEXTS.recordButton;

  useEffect(() => {
    initializeMessages();
  }, [initializeMessages]);

  const submitMessage: SubmitHandler<MvpChatMessageFormValues> = async (formValues) => {
    if (isSubmitDisabled) {
      return;
    }

    await sendMessage(formValues.text.trim());
    reset(MVP_CHAT_MESSAGE_FORM_DEFAULT_VALUES);
  };

  const handleAudioRecordingToggle = async () => {
    if (isRecording) {
      await stopAudioRecording();

      return;
    }

    await startAudioRecording();
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
                  {message.payload.type === MVP_CHAT_PAYLOAD_TYPES.text && (
                    <Typography variant={'body1'}>{message.payload.text}</Typography>
                  )}
                  {message.payload.type === MVP_CHAT_PAYLOAD_TYPES.audio && (
                    <MvpChatAudio controls={true} preload={'metadata'} src={message.payload.audioUrl} />
                  )}
                </MvpChatMessageBubble>
              </MvpChatMessageRow>
            );
          })}
        </MvpChatMessagesStack>
      </MvpChatMessagesArea>

      <MvpChatForm onSubmit={handleSubmit(submitMessage)}>
        {pendingAudioUrl !== null && (
          <MvpChatPendingAudioPanel>
            <Typography variant={'body2'}>{MVP_CHAT_TEXTS.pendingAudioLabel}</Typography>
            <MvpChatAudio controls={true} preload={'metadata'} src={pendingAudioUrl} />
          </MvpChatPendingAudioPanel>
        )}
        {audioRecordingErrorMessage !== null && (
          <Typography color={'error'} variant={'body2'}>
            {audioRecordingErrorMessage}
          </Typography>
        )}
        <MvpChatComposerRow>
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
          <Button
            type={'button'}
            variant={isRecording ? 'contained' : 'outlined'}
            disabled={isMessageSending || isMicrophoneRequesting}
            onClick={handleAudioRecordingToggle}
          >
            {recordButtonText}
          </Button>
          <Button type={'submit'} variant={'contained'} disabled={isSubmitDisabled}>
            {MVP_CHAT_TEXTS.sendButton}
          </Button>
        </MvpChatComposerRow>
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
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 3),
  };
});

const MvpChatPendingAudioPanel = styled(Box)(({ theme }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(1.5),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  };
});

const MvpChatComposerRow = styled(Box)(({ theme }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(1.5),

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

const MvpChatAudio = styled('audio')(() => {
  return {
    maxWidth: '100%',
  };
});
