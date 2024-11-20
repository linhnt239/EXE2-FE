'use client';

import * as React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronUp } from 'akar-icons';
import clsx from 'clsx';
import * as joi from 'joi';
import { WiStars } from 'react-icons/wi';
import { useSelector } from 'react-redux';

import { UserPostIV1CreateDto, userPostApi } from '@/core/api/user-post.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import { NKRichTextProps } from '@/core/components/form/NKRichText';
import NKTextField from '@/core/components/form/NKTextField';
import ForumMiniCard from '@/core/components/forum/ForumMiniCard';
// import { NKRichText } from '@/core/components/form/NKRichText';
import PostCard from '@/core/components/post/PostCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { UserPost } from '@/core/models/userPost';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false }) as React.FC<NKRichTextProps>;

interface PostPageProps {}

const PostPage: React.FunctionComponent<PostPageProps> = () => {
    const queryClient = useQueryClient();

    return (
        <div className="flex w-full max-w-[920px] flex-col">
            <div>
                <div className="flex w-full pb-2 text-2xl font-bold text-black">Diễn đàn Desvi</div>
            </div>
            <div className="flex w-full items-start gap-3 rounded bg-slate-50 p-4 shadow ">
                <div className="flex w-full flex-col">
                    <NKFormWrapper<UserPostIV1CreateDto>
                        apiAction={(data) => {
                            return userPostApi.v1Create(data);
                        }}
                        schema={{
                            content: joi.string().required(),
                            title: joi.string().required(),
                            tag: joi.any(),
                        }}
                        defaultValues={{
                            tag: '',
                            content: '',
                            title: '',
                        }}
                        onExtraSuccessAction={(_, form) => {
                            form.reset();
                            queryClient.invalidateQueries(['userPostApi.v1Get']);
                        }}
                    >
                        <div className="flex w-full flex-col gap-4">
                            <NKTextField theme="DEFAULT" label="Tiêu đề" name="title" placeholder="Tiêu đề bài viết" className="w-full" />
                            <NKRichText label="Nội dung" name="content" placeholder="Bạn đang nghĩ gì?" className="w-full" />
                            <div className="mt-2 flex w-full justify-end">
                                <button className="text-base font-bold text-black">Gửi</button>
                            </div>
                        </div>
                    </NKFormWrapper>
                </div>
            </div>

            <div className="w-full">
                <ScrollInfinityBuilder
                    className="my-2 mb-8 flex !w-full flex-col gap-2"
                    queryApi={userPostApi.v1Get}
                    sourceKey="userPostApi.v1Get"
                    render={(item: UserPost, index) => <ForumMiniCard data={item} key={item.id} />}
                />
            </div>
        </div>
    );
};

export default PostPage;
