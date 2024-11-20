'use client';

import * as React from 'react';

import Link from 'next/link';

import { Dialog, Listbox, Popover, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import clsx from 'clsx';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { NKRouter } from '@/core/NKRouter';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { userMeTicketApi } from '@/core/api/user-me-ticket.api';

interface SendMessageForm {
    message: string;
    type?: 'TEXT' | 'IMAGE';
}

const defaultValues: SendMessageForm = {
    message: '',
    type: 'TEXT',
};

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const formMethods = useForm<SendMessageForm>({ defaultValues });
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [lastMessageId, setLastMessageId] = React.useState<string>('');
    const [lastMessageScrollId, setLastMessageScrollId] = React.useState<string>('');

    React.useEffect(() => {
        if (lastMessageId !== lastMessageScrollId) {
            setLastMessageScrollId(lastMessageId);
            setTimeout(() => {
                wrapperRef.current?.scrollTo({
                    top: wrapperRef.current?.scrollHeight,
                    behavior: 'smooth',
                });
            }, 1000);
        }
    }, [lastMessageId]);

    const userTicketQuery = useQuery(
        ['user-me-ticket'],
        async () => {
            const res = await userMeTicketApi.v1GetByName('support');

            return res.userTicketMessages;
        },
        {
            initialData: [],
            refetchInterval: 3000,
            onSuccess(data) {
                const lastMessage = data[data.length - 1];
                if (lastMessage.id !== lastMessageId) {
                    setLastMessageId(lastMessage.id);
                }
            },
        },
    );
    const sendMessageMutation = useMutation(
        (message: string) => {
            return userMeTicketApi.v1PostSend({
                message,
                type: 'TEXT',
                name: 'support',
            });
        },
        {
            onSuccess: (data) => {
                userTicketQuery.refetch();
                setTimeout(() => {
                    wrapperRef.current?.scrollTo({
                        top: wrapperRef.current?.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 1000);
            },
        },
    );

    const sendImageMessageMutation = useMutation(
        async (file: File) => {
            const res = await uploadFileApi.v1UploadFile(file);

            return userMeTicketApi.v1PostSend({
                message: res,
                name: 'support',
                type: 'IMAGE',
            });
        },
        {
            onSuccess: (data) => {
                userTicketQuery.refetch();
                setTimeout(() => {
                    wrapperRef.current?.scrollTo({
                        top: wrapperRef.current?.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 1000);
            },
        },
    );

    return (
        <div className="fade-in  flex h-screen w-full  flex-col bg-white">
            <div className={`fixed left-0 top-0 z-[1000] flex h-screen w-full  flex-col border bg-cover`}>
                <div
                    className={`  z-10 flex w-full flex-col items-center justify-center bg-[url('https://plus.unsplash.com/premium_photo-1666299884107-2c2cf920ee59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')] bg-cover px-4 py-8`}
                >
                    <div className="inline-block rounded-md bg-white/70  px-8 py-2 text-black">
                        <div className="text-center text-2xl font-semibold">Liên Hệ Hỗ Trợ</div>
                        <div className="text-center text-sm">Giải Quyết Vấn đề của bạn</div>
                    </div>
                    <div className="absolute  left-0 top-2 flex h-10 w-full  items-center justify-start px-4">
                        <Link href={NKRouter.app.settings.index()}>
                            <ChevronLeft strokeWidth={3} size={24} />
                        </Link>
                    </div>
                </div>
                <div className="relative flex   h-full flex-col justify-end overflow-y-auto" ref={wrapperRef}>
                    <div className="absolute left-0 top-0  flex w-full flex-col">
                        <div className="flex-1 p-4  ">
                            <div className="flex flex-col gap-2">
                                {userTicketQuery.data.map((message, idx) => {
                                    return (
                                        <div key={message.id} className="flex w-full flex-col">
                                            {moment(message.createdAt)
                                                .subtract(10, 'minutes')
                                                .isAfter(userTicketQuery.data[idx - 1]?.createdAt) && (
                                                <p className="my-3 text-center text-xs text-gray-700">
                                                    {moment(message.createdAt).format('HH:mm - DD/MM')}
                                                </p>
                                            )}

                                            <div
                                                className={clsx('fade-in flex w-full items-end justify-end gap-2 ', {
                                                    'flex-row-reverse': message.isResponse,
                                                })}
                                            >
                                                <div
                                                    className={clsx('flex w-full max-w-[280px] justify-end', {
                                                        'flex-row-reverse': message.isResponse,
                                                    })}
                                                >
                                                    <p
                                                        className={clsx('break-words  rounded-md px-4 py-2', {
                                                            'bg-[#EADA99]': message.isResponse && message.type === 'TEXT',
                                                            'bg-[#F1F1F1]': !message.isResponse && message.type === 'TEXT',
                                                        })}
                                                    >
                                                        {message.type === 'TEXT' && <>{message.content}</>}
                                                        {message.type === 'IMAGE' && (
                                                            <>
                                                                <PhotoProvider speed={() => 200} maskOpacity={1} className="z-50">
                                                                    <PhotoView src={message.content}>
                                                                        <img src={message.content} alt="" className="h-full w-full" />
                                                                    </PhotoView>
                                                                </PhotoProvider>
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full bg-white px-2 py-6">
                    <form className="flex w-full rounded-sm ">
                        <input
                            placeholder="Bạn cần hỗ trợ gì?"
                            className="h-10 w-full border px-4 focus:outline-none"
                            {...formMethods.register('message')}
                        />
                        <button
                            onClick={formMethods.handleSubmit((data) => {
                                sendMessageMutation.mutate(data.message);
                                formMethods.reset();
                            })}
                            type="submit"
                            className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-600 text-2xl text-white"
                        >
                            <FiSend />
                        </button>
                    </form>
                    <div>
                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                sendImageMessageMutation.mutateAsync(file);
                            }}
                        />
                        <label htmlFor="file" className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-700 text-2xl text-white">
                            <BsImage />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
