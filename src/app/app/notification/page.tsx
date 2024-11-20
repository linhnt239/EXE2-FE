'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import _get from 'lodash/get';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { IV1CreateWithUser, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userMeNotificationApi } from '@/core/api/user-me-notification';
import { userApi } from '@/core/api/user.api';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { isActiveTime } from '@/core/utils/data.helper';
import { HKMoment } from '@/core/utils/moment';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const notificationQuery = useQuery(
        ['notification', 'user'],
        async () => {
            const res = await userMeNotificationApi.v1Get({
                filters: [],
                orderBy: [],
                page: 0,
                pageSize: 10000,
            });

            return res.data;
        },
        {
            refetchInterval: 2000,
            initialData: [],
        },
    );

    useEffect(() => {
        userMeNotificationApi.v1PutMarkAsRead();
    }, []);

    return (
        <div
            className="flex w-full flex-1  flex-col gap-4 overflow-y-auto"
            style={{
                height: 'calc(100vh - 4.5rem)',
            }}
        >
            <div className="flex flex-col p-2">
                {notificationQuery.data
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .map((item, index) => {
                        return (
                            <div
                                className={clsx('flex w-full flex-1 items-start  gap-4 rounded-lg p-2', {
                                    'border-b': notificationQuery.data.length - 1 !== index,
                                    'bg-gray-100': item.status === 'UNREAD',
                                })}
                                key={item.id}
                            >
                                <div className="relative h-12 w-12  flex-shrink-0">
                                    <img className="h-full w-full overflow-hidden rounded-full" src={item.sender.avatar} alt="" />
                                    {isActiveTime(item.sender.lastActive) && (
                                        <>
                                            <div className="absolute bottom-0.5 right-0.5 z-10 h-3 w-3 rounded-full bg-green-500"></div>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm font-bold"> {item.title}</div>
                                    <div className="text-sm">{item.content}</div>
                                    <p className="text-sm text-gray-600">{HKMoment.moment(item.createdAt).fromNow()}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Page;
