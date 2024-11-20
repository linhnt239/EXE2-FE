'use client';

import * as React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import joi from 'joi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { chatMessageApi } from '@/core/api/chat-message.api';
import { userMeSettingApi } from '@/core/api/user-me-setting.api';
import { userMeApi } from '@/core/api/user-me.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKSelectField from '@/core/components/form/NKSelectField';
import { UserSetting } from '@/core/models/userSetting';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface PageProps {}

interface SettingForm extends Pick<UserSetting, 'lang'> {}

const Page: React.FC<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(
        ['user-me', userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    const userSettingQuery = useQuery<UserSetting>(
        ['settings'],
        async () => {
            return await userMeSettingApi.v1GetAll();
        },
        {
            initialData: {
                lang: 'englishContent',
            },
        },
    );

    const languagesQuery = useQuery(
        ['languages'],
        async () => {
            const res = await chatMessageApi.v1GetEnumLanguage();
            return res;
        },
        {
            initialData: [],
        },
    );

    return (
        <div className="fade-in flex w-full flex-1 flex-col bg-white p-4">
            {Boolean(userMeQuery.data?.id) && (
                <>
                    <div className="relative">
                        <Link href={NKRouter.app.settings.index()} className="absolute left-4  top-4 h-6 w-6 rounded-lg bg-white/90 text-black">
                            <div>
                                <ChevronLeft strokeWidth={2} size={24} />
                            </div>
                        </Link>
                    </div>
                    <div className="mb-4 mt-16 text-lg font-bold">Change Language</div>
                    <div className="flex flex-col gap-2">
                        <NKFormWrapper<SettingForm>
                            apiAction={async (data) => {
                                await userMeSettingApi.v1PutSetting({
                                    key: 'lang',
                                    value: data.lang,
                                });
                            }}
                            defaultValues={{
                                lang: userSettingQuery.data.lang ?? '',
                            }}
                            schema={{
                                lang: joi.string().required(),
                            }}
                            onExtraSuccessAction={(data) => {
                                toast.success('Cập nhật thông tin thành công');
                            }}
                        >
                            <div className="flex flex-col gap-3">
                                <NKSelectField
                                    isShow={true}
                                    name="lang"
                                    label="Language"
                                    theme={'AUTH'}
                                    className="text-white"
                                    options={languagesQuery.data.map((item) => ({
                                        label: item.label,
                                        value: item.value,
                                    }))}
                                    defaultValue={userSettingQuery.data.lang}
                                />

                                <div className="flex w-full items-center justify-center">
                                    <button className="w-full rounded-xl bg-[#DEE1E6] px-2.5 py-3 text-sm font-semibold text-black  shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200">
                                        Update language
                                    </button>
                                </div>
                            </div>
                        </NKFormWrapper>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;
