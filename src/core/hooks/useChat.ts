import * as React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { uploadFileApi } from '../api/upload-file.api';
import { userMeChatApi } from '../api/user-me-chat.api';
import { User } from '../models/user';
import { RootState } from '../store';
import { UserState } from '../store/user';
import { isActiveTime } from '../utils/data.helper';

export const useChat = (chatId: string) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [chatUser, setChatUser] = React.useState<User>();
    const [lastMessageId, setLastMessageId] = React.useState<string>('');
    const [lastMessageScrollId, setLastMessageScrollId] = React.useState<string>('');
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    const chat = useQuery(
        ['chat', chatId],
        async () => {
            const res = await userMeChatApi.v1GetById(chatId);
            const chatUser = res.users.filter((u) => u.id !== userState.id)[0];

            const isActive = res.users.every((u) => {
                return isActiveTime(u.lastActive);
            });

            if (chatUser) {
                setChatUser(chatUser);
            }
            return res;
        },
        {
            refetchInterval: 1000,
            enabled: Boolean(chatId),
            onSuccess: (data) => {
                if (!data.chatMessages.length) return;
                setLastMessageId(data.chatMessages[data.chatMessages.length - 1].id);
            },
        },
    );

    React.useEffect(() => {
        if (lastMessageId !== lastMessageScrollId) {
            setLastMessageScrollId(lastMessageId);
            setTimeout(() => {
                scrollToBottom();
            }, 1000);
        }
    }, [lastMessageId]);

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current?.scrollHeight,
            behavior: 'smooth',
        });
    };

    const sendMessageMutation = useMutation(
        (message: string) => {
            return userMeChatApi.v1CreateMessage(chatId, {
                content: message,
                type: 'TEXT',
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        },
    );

    const sendStickerMessageMutation = useMutation(
        async (image: string) => {
            return userMeChatApi.v1CreateMessage(chatId, {
                content: image,
                type: 'IMAGE',
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        },
    );

    const sendImageMessageMutation = useMutation(
        async (file: File) => {
            const res = await uploadFileApi.v1UploadFile(file);

            return userMeChatApi.v1CreateMessage(chatId, {
                content: res,
                type: 'IMAGE',
            });
        },
        {
            onSuccess: (data) => {
                chat.refetch();
                setTimeout(() => {
                    scrollToBottom();
                }, 1000);
            },
        },
    );

    const leaveGroupChatMutation = useMutation(async () => {
        if (!chat.data || !chat.data.isGroup) return;

        const res = await userMeChatApi.v1PostLeave(chatId);

        return res;
    });

    const addUsersMutation = useMutation(
        async (userIds: string[]) => {
            if (!chat.data || !chat.data.isGroup) return;

            const res = await userMeChatApi.v1PostAddUsers(chatId, {
                userIds,
            });

            return res;
        },
        {
            onSuccess: (data) => {
                chat.refetch();
            },
        },
    );

    return {
        chat,
        chatUser,
        chatContainerRef,
        sendMessageMutation,
        sendStickerMessageMutation,
        sendImageMessageMutation,
        leaveGroupChatMutation,
        addUsersMutation,
    };
};
