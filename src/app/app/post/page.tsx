'use client';

import * as React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import * as joi from 'joi';
import { WiStars } from 'react-icons/wi';
import { useSelector } from 'react-redux';

import { UserPostIV1CreateDto, userPostApi } from '@/core/api/user-post.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import { NKRichTextProps } from '@/core/components/form/NKRichText';
// import { NKRichText } from '@/core/components/form/NKRichText';
import PostCard from '@/core/components/post/PostCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false }) as React.FC<NKRichTextProps>;

interface PostPageProps {}

const PostPage: React.FunctionComponent<PostPageProps> = () => {
    const queryClient = useQueryClient();

    const userState = useSelector<RootState, UserState>((state) => state.user);

    return (
        <div className="fade-in flex h-full w-full flex-col items-start justify-start bg-white pb-10">
            <div className="flex w-full items-center justify-center pb-2 pt-8 text-2xl font-bold text-black">Khám Phá</div>
            <div className="flex w-full items-start gap-3 bg-[#E6EEFA] p-4 ">
                <div className="flex w-full flex-col">
                    <NKFormWrapper<UserPostIV1CreateDto>
                        apiAction={(data) => {
                            return userPostApi.v1Create(data);
                        }}
                        schema={{
                            title: joi.string().required(),
                            content: joi.string().required(),
                            tag: joi.any(),
                        }}
                        defaultValues={{
                            title: '',
                            tag: '',
                            content: '',
                        }}
                        onExtraSuccessAction={(_, form) => {
                            form.reset();
                            queryClient.invalidateQueries(['userPostApi.v1Get']);
                        }}
                    >
                        <NKRichText label="" name="content" placeholder="Bạn đang nghĩ gì?" className="w-full" />
                        <div className="mt-2 flex w-full justify-end">
                            <button className="text-base font-bold text-black">Đăng</button>
                        </div>
                    </NKFormWrapper>
                </div>
            </div>

            <div className="w-full">
                <ScrollInfinityBuilder
                    className="my-2 mb-8 flex !w-full flex-col gap-2"
                    queryApi={userPostApi.v1Get}
                    sourceKey="userPostApi.v1Get"
                    render={(item, index) => <PostCard data={item} key={item.id} className="shadow" />}
                />
            </div>
        </div>
    );
};

export default PostPage;
