'use client';

import React from 'react';

import { Popover } from 'antd';
import { MessageCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

import { ChatContextProvider } from '@/core/contexts/useChatContext';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

import ChatHomeContent from './ChatHomeContent';

const ChatPopup = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    return userState.isAuth ? (
        <ChatContextProvider>
            <Popover
                trigger="click"
                overlayStyle={{
                    width: '400px',
                    padding: 0,
                }}
                overlayInnerStyle={{
                    padding: 0,
                    overflow: 'hidden',
                }}
                placement="topLeft"
                content={ChatHomeContent}
            >
                <div className="fixed bottom-6 right-6 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-green-600 bg-white shadow">
                    <MessageCircle className="h-10 w-10" />
                </div>
            </Popover>
        </ChatContextProvider>
    ) : null;
};

export default ChatPopup;
