'use client';

import * as React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Dialog, Listbox, Popover, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronRight } from 'akar-icons';
import clsx from 'clsx';
import joi from 'joi';
import _get from 'lodash/get';
import { useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import { PiSmileySticker } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { photoGroupApi } from '@/core/api/photo-group.api';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { IV1PutGroupChat, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userMeSubscriptionApi } from '@/core/api/user-me-subscription.api';
import { userApi } from '@/core/api/user.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import { useChatContext } from '@/core/contexts/useChatContext';
import { FilterComparator } from '@/core/models/common';
import { PhotoGroup } from '@/core/models/photoGroup';
import { User } from '@/core/models/user';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { isActiveTime } from '@/core/utils/data.helper';
import { HKMoment } from '@/core/utils/moment';

interface SendMessageForm {
    message: string;
}

const defaultValues: SendMessageForm = {
    message: '',
};

const ChatDetail = () => {
    const formMethods = useForm<SendMessageForm>({ defaultValues });
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedPhotoGroup, setSelectedPhotoGroup] = React.useState<PhotoGroup>();
    const stickerBtn = React.useRef<HTMLButtonElement>(null);

    const {
        addUsersMutation,
        chat,
        chatContainerRef,
        chatUser,
        isActive,
        leaveGroupChatMutation,
        sendImageMessageMutation,
        sendMessageMutation,
        sendStickerMessageMutation,
        setChatId,
        chatId,
    } = useChatContext();

    const userSubscription = useQuery(['subscription', 'me'], async () => {
        const res = await userMeSubscriptionApi.v1Get();
        return Boolean(res.id);
    });

    const router = useRouter();

    const closeModal = () => {
        setSelected([]);
        setIsOpen(false);
    };

    const handleAddUsers = async () => {
        const userIds = selected.map((user) => user.id);
        addUsersMutation.mutateAsync(userIds).then(() => {
            closeModal();
        });
    };

    const [selected, setSelected] = React.useState<User[]>([]);

    const searchMethods = useForm<{ search: string }>({ defaultValues: { search: '' } });

    const searchWatch = searchMethods.watch('search');

    const users = useQuery(
        ['user-system', 'user', searchWatch],
        async () => {
            const res = await userApi.v1Get({
                filters: [
                    `name||${FilterComparator.LIKE}||${searchWatch}`,
                    // `slug||${FilterComparator.LIKE}||${chat.data?.slug || ''}`
                ],
                orderBy: [],
                page: 0,
                pageSize: 10000,
            });

            return res.data.filter((user) => user.id !== userState.id);
        },
        {
            enabled: Boolean(chat?.data?.isGroup),
            initialData: [],
        },
    );

    const [openLeave, setOpenLeave] = React.useState<boolean>(false);

    const photoGroup = useQuery(
        ['photo-group'],
        async () => {
            const res = await photoGroupApi.v1GetAll();
            return res;
        },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            initialData: [],
            onSuccess: (data) => {
                if (data.length) {
                    setSelectedPhotoGroup(data[0]);
                }
            },
        },
    );

    const createGroupChatMutation = useMutation(async () => {
        if (!chatUser) return;

        const res = await userMeChatApi.v1PostCreateWithGroup({
            name: `Nhóm chat của ${userState.name} và ${chatUser?.name}`,
            userId: chatUser.id,
        });

        return res;
    });

    const [openUpdateInfo, setOpenUpdateInfo] = React.useState<boolean>(false);

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    return (
        <>
            <div className="flex h-[480px]  w-full flex-1 flex-col gap-4 overflow-y-auto">
                {!chat?.isSuccess ? (
                    <div className="flex flex-1 items-center justify-center">Loading...</div>
                ) : (
                    <>
                        <div className="fade-in  flex  flex-1 flex-col bg-white">
                            <div className="relative z-10 flex h-28 items-start justify-between gap-4 bg-gradient-to-tr from-blue-500 via-blue-400 to-indigo-600 p-4">
                                <div
                                    onClick={() => {
                                        setChatId('');
                                    }}
                                    className=" h-6  w-6 cursor-pointer rounded-lg text-white"
                                >
                                    <div>
                                        <ArrowLeft strokeWidth={2} size={24} />
                                    </div>
                                </div>
                                <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1">
                                    {Boolean(chatUser || chat.data.isGroup) && (
                                        <button className={clsx('flex w-full flex-1 flex-col  items-center gap-1')}>
                                            <div className="relative h-8 w-8  flex-shrink-0 overflow-hidden">
                                                <img
                                                    className="h-full w-full overflow-hidden rounded-full"
                                                    src={chat.data.isGroup ? chat.data.banner : chatUser?.avatar}
                                                    alt={''}
                                                />
                                                {isActiveTime(chatUser?.lastActive) && (
                                                    <>
                                                        <div className="absolute bottom-0.5 right-0.5 z-10 h-3 w-3 rounded-full bg-green-500"></div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center  text-left text-white">
                                                <div className="font-semibold ">{chat.data.name}</div>
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div className="text-xs text-white">
                                    {isActiveTime(chatUser?.lastActive) ? 'Online' : HKMoment.moment(chatUser?.lastActive).fromNow()}
                                </div>
                            </div>

                            <div className="relative   flex h-full flex-col justify-end overflow-y-scroll" ref={chatContainerRef}>
                                <div className="absolute   left-0 top-0  flex h-fit min-h-full w-full flex-col  justify-start gap-2 px-2 py-10 ">
                                    {chat.data.chatMessages
                                        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                                        .map((message, idx) => {
                                            return (
                                                <div className="flex w-full  flex-col" key={message.id}>
                                                    {HKMoment.moment(message.createdAt)
                                                        .subtract(10, 'minutes')
                                                        .isAfter(HKMoment.moment(chat.data.chatMessages[idx - 1]?.createdAt)) && (
                                                        <p className="my-3 text-center text-xs text-gray-700">
                                                            {HKMoment.moment(message.createdAt).format('HH:mm - DD/MM')}
                                                        </p>
                                                    )}

                                                    <div
                                                        className={clsx('fade-in flex w-full items-end justify-end gap-2 ', {
                                                            'flex-row-reverse': message.user.id !== userState.id,
                                                        })}
                                                    >
                                                        <div
                                                            className={clsx('flex w-full max-w-[180px] justify-end', {
                                                                'flex-row-reverse': message.user.id !== userState.id,
                                                            })}
                                                        >
                                                            {message.type === 'IMAGE' ? (
                                                                <img className="h-full w-full object-cover" src={message.content} alt="" />
                                                            ) : (
                                                                <p
                                                                    className={clsx('break-words  rounded-md px-4 py-2', {
                                                                        'bg-indigo-700 text-white': message.user.id === userState.id,
                                                                        'bg-[#F1F1F1] text-black': message.user.id !== userState.id,
                                                                    })}
                                                                >
                                                                    {_get(message, 'content', '')}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="h-4 w-4 flex-shrink-0">
                                                            {chat.data.chatMessages[idx + 1]?.user.id !== message.user.id && (
                                                                <div className="h-full w-full  overflow-hidden rounded-full">
                                                                    <img className="h-full w-full object-cover" src={message.user.avatar} alt="" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                            <form className="relative z-50 w-full border-t border-solid bg-gray-100">
                                <div className="relative flex w-full items-center rounded-sm  bg-white px-4 py-2">
                                    <Popover className="absolute bottom-full  left-0 z-50 px-0">
                                        <Popover.Button ref={stickerBtn}></Popover.Button>

                                        <Popover.Panel unmount={true} className="fade-in    w-full">
                                            <div className="flex   w-screen flex-col gap-2 bg-gray-200 p-4">
                                                <div className="flex flex-nowrap items-center gap-1 overflow-y-auto">
                                                    {photoGroup.data.map((group) => (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPhotoGroup(group);
                                                            }}
                                                            key={group.id}
                                                            className={clsx(
                                                                'whitespace-nowrap rounded-md px-4 py-1 text-sm text-black duration-300',
                                                                {
                                                                    'bg-[#EADA99]': selectedPhotoGroup?.id === group.id,
                                                                },
                                                            )}
                                                        >
                                                            {group.name}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="grid h-64 grid-cols-4   overflow-x-auto">
                                                    {selectedPhotoGroup?.imageUrls.map((image) => (
                                                        <button
                                                            key={image}
                                                            onClick={() => {
                                                                sendStickerMessageMutation.mutate(image);
                                                                stickerBtn.current?.click();
                                                            }}
                                                            className="h-20 w-20"
                                                        >
                                                            <img src={image} className="h-full w-full object-contain" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                    <input placeholder="" className="h-10 w-full px-4 focus:outline-none" {...formMethods.register('message')} />

                                    <div className="relative">
                                        <Popover>
                                            <Popover.Button className="flex h-10 w-10 shrink-0 items-center justify-center text-xl text-gray-400">
                                                <BsImage />
                                            </Popover.Button>
                                            <Popover.Panel className="fade-in absolute  bottom-[120%] left-0 flex flex-col">
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
                                                    <label
                                                        htmlFor="file"
                                                        className="flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-700 text-2xl text-white"
                                                    >
                                                        <BsImage />
                                                    </label>
                                                </div>
                                                {userSubscription.data && (
                                                    <button
                                                        className="flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-700 text-2xl text-white"
                                                        onClick={() => {
                                                            stickerBtn.current?.click();
                                                        }}
                                                        type="button"
                                                    >
                                                        <PiSmileySticker />
                                                    </button>
                                                )}
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                    <button
                                        onClick={formMethods.handleSubmit((data) => {
                                            sendMessageMutation.mutate(data.message);
                                            formMethods.reset();
                                        })}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-white"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* NOTE - Add user to group chat */}
                        <Transition appear show={isOpen} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex h-full min-h-[640px] items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="flex w-full max-w-md transform flex-col overflow-hidden  rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="mb-2 text-lg font-medium leading-6 text-gray-900">
                                                    Add member to group
                                                </Dialog.Title>
                                                <input
                                                    placeholder="Find"
                                                    className="mb-2 w-full rounded-full border border-black py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                    {...searchMethods.register('search')}
                                                />
                                                <Transition
                                                    as={'div'}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    className={'mb-2 flex flex-wrap gap-2'}
                                                    show={Boolean(selected.length)}
                                                >
                                                    {selected.map((user) => (
                                                        <div key={user.id} className="h-10 w-10 overflow-hidden rounded-full">
                                                            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                                                        </div>
                                                    ))}
                                                </Transition>
                                                <Listbox multiple value={selected} onChange={setSelected}>
                                                    <div className="relative mt-1">
                                                        <Transition
                                                            as={React.Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                            show={true}
                                                        >
                                                            <Listbox.Options className="h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {users.data.length === 0 ? (
                                                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                        Not Found
                                                                    </div>
                                                                ) : (
                                                                    users.data.map((user) => (
                                                                        <Listbox.Option
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                                }`
                                                                            }
                                                                            key={user.id}
                                                                            value={user}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="h-8 w-8 overflow-hidden rounded-full">
                                                                                        <img
                                                                                            src={user.avatar}
                                                                                            alt=""
                                                                                            className="h-full w-full object-cover"
                                                                                        />
                                                                                    </div>
                                                                                    <span
                                                                                        className={`block truncate ${
                                                                                            selected ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                    >
                                                                                        {user.name}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                                                active ? 'text-white' : 'text-teal-600'
                                                                                            }`}
                                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                </div>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))
                                                                )}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => handleAddUsers()}
                                                    >
                                                        Add member
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* NOTE - Change group info */}
                        <Transition appear show={openUpdateInfo} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setOpenLeave(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex h-full min-h-[640px] items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Group info
                                                </Dialog.Title>

                                                <div className="mt-2">
                                                    <NKFormWrapper<IV1PutGroupChat>
                                                        apiAction={async (data) => {
                                                            return await userMeChatApi.v1PutGroupChat(chatId, data);
                                                        }}
                                                        defaultValues={{
                                                            name: chat.data?.name ?? '',
                                                            banner: chat.data?.banner ?? '',
                                                        }}
                                                        schema={{
                                                            name: joi.string().required(),

                                                            banner: joi.string().required(),
                                                        }}
                                                        onExtraSuccessAction={(data) => {
                                                            toast.success('Update group info success');
                                                            setOpenUpdateInfo(false);
                                                            chat.refetch();
                                                        }}
                                                    >
                                                        {(methods) => (
                                                            <>
                                                                <div
                                                                    className="relative flex w-full justify-center"
                                                                    onClick={() => {
                                                                        // create a new input element
                                                                        const input = document.createElement('input');
                                                                        // set its type to file
                                                                        input.type = 'file';
                                                                        // set how many files it can accept
                                                                        input.accept = 'image/*';
                                                                        // set onchange event to call callback when user has selected file

                                                                        input.onchange = async (e: any) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const url = await uploadImageMutation.mutateAsync(file);
                                                                                methods.setValue('banner', url);
                                                                            }
                                                                        };
                                                                        // click the input element to show file browser dialog
                                                                        input.click();
                                                                    }}
                                                                >
                                                                    <img src={methods.watch('banner')} className="h-20 w-20 rounded-full" />
                                                                </div>
                                                                <NKTextField
                                                                    name="name"
                                                                    label="Name"
                                                                    placeholder="Name"
                                                                    theme={'AUTH'}
                                                                    className="text-white"
                                                                />
                                                                <div className="mt-4">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    >
                                                                        Update group info
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </NKFormWrapper>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* NOTE - Leave user to group chat */}
                        <Transition appear show={openLeave} as={React.Fragment}>
                            <Dialog as="div" className="relative z-50" onClose={() => setOpenLeave(false)}>
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 z-0  bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10  h-full overflow-y-auto">
                                    <div className="flex h-full min-h-[640px] items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={React.Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Leave the group chat
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to leave the group chat? You will not be able to undo this action once
                                                        it is done.
                                                    </p>
                                                </div>

                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        onClick={() =>
                                                            leaveGroupChatMutation.mutateAsync().then(() => {
                                                                router.push(NKRouter.app.chat.index());
                                                            })
                                                        }
                                                    >
                                                        Leave the group chat
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </>
                )}
            </div>
        </>
    );
};

export default ChatDetail;
