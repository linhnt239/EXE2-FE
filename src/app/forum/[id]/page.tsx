'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'akar-icons';
import { Skeleton } from 'antd';
import clsx from 'clsx';
import joi from 'joi';
import _get from 'lodash/get';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { UserPostCommentLikeIV1CreateDto, userPostCommentLikeApi } from '@/core/api/user-post-comment-like.api';
import { UserPostCommentIV1CreateDto, userPostCommentApi } from '@/core/api/user-post-comment.api';
import { UserPostLikeIV1CreateDto, userPostLikeApi } from '@/core/api/user-post-like.api';
import { userPostApi } from '@/core/api/user-post.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKRichText from '@/core/components/form/NKRichText';
import { UserPost } from '@/core/models/userPost';
import { UserPostComment } from '@/core/models/userPostComment';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const params = useParams();
    const id = _get(params, 'id') as string;

    const dataQuery = useQuery(['userPostApi.v1Get', id], () => userPostApi.v1GetById(id));

    const reactMutation = useMutation(
        async (dto: UserPostLikeIV1CreateDto) => {
            return await userPostLikeApi.v1Create(id, dto);
        },
        {
            onSuccess: () => {
                dataQuery.refetch();
            },
        },
    );

    const checkUserReacted = (post: UserPost) => {
        const index = post.userPostLikes.findIndex((reaction) => reaction.user.id === userState.id && reaction.react === 1);
        if (index === -1) {
            return false;
        }
        return true;
    };

    const reactCommentMutation = useMutation(
        async (dto: UserPostCommentLikeIV1CreateDto) => {
            return await userPostCommentLikeApi.v1Create(dto);
        },
        {
            onSuccess: () => {
                dataQuery.refetch();
            },
        },
    );

    const checkUserCommentReacted = (comment: UserPostComment) => {
        const index = comment.userPostCommentLikes.findIndex((reaction) => reaction.user.id === userState.id && reaction.react !== 0);
        if (index === -1) {
            return false;
        }
        return true;
    };

    return (
        <div className="flex h-full w-full max-w-[1024px] flex-col">
            <nav className="mb-8 text-lg font-medium">
                <ul className="flex gap-2">
                    <li className="duration-200 hover:text-green-600">
                        <Link href={NKRouter.forum.index()}>Diễn dàn</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <span className="text-green-700">Chi tiết</span>
                    </li>
                </ul>
            </nav>
            {dataQuery.isSuccess ? (
                <div className="flex w-full flex-col gap-5">
                    <section className="flex h-full min-h-64 w-full  overflow-hidden rounded-lg border border-[#4ade80] shadow-[5px_5px_0px_0px_#4ade80]">
                        <div className="flex w-[16%] flex-shrink-0 flex-col items-center  gap-4 self-stretch  bg-green-50 p-4">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden  rounded border-2 border-green-600">
                                <img src={dataQuery.data?.user.avatar} alt="" className="h-full w-full object-cover" />
                            </div>
                            <p className="font-medium text-gray-900">{dataQuery.data?.user.name}</p>
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    onClick={() => {
                                        if (!checkUserReacted(dataQuery?.data)) {
                                            reactMutation.mutate({ react: 1 });
                                        }
                                    }}
                                    className={clsx('flex h-8 w-8 cursor-pointer flex-col items-center justify-center', {
                                        'text-green-600': dataQuery.data.userPostLikes.findIndex((like) => like.user.id === userState.id) >= 0,
                                        'text-gray-600': dataQuery.data.userPostLikes.findIndex((like) => like.user.id === userState.id) < 0,
                                    })}
                                >
                                    <ChevronUp className="h-full w-full" />
                                </div>
                                <span className="text-lg font-semibold">
                                    {dataQuery.data?.userPostLikes.filter((like) => like.react === 1).length || 0}
                                </span>
                                <div
                                    onClick={() => {
                                        if (checkUserReacted(dataQuery?.data)) {
                                            reactMutation.mutate({ react: 0 });
                                        }
                                    }}
                                    className={clsx('flex h-8 w-8 cursor-pointer flex-col items-center justify-center text-red-600')}
                                >
                                    <ChevronDown className="h-full w-full" />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-col px-8 py-4">
                            <h1 className="text-2xl font-semibold">{dataQuery.data?.title}</h1>
                            <div className="pop prose text-base text-gray-800" dangerouslySetInnerHTML={{ __html: dataQuery.data?.content || '' }} />
                        </div>
                    </section>
                    <section id="comment-form" className="flex h-full w-full  flex-col gap-4 overflow-hidden rounded-lg px-8 py-4 shadow">
                        <div className=" text-2xl font-semibold text-gray-900">Để lại bình luận</div>
                        <NKFormWrapper<UserPostCommentIV1CreateDto>
                            apiAction={(data) => {
                                return userPostCommentApi.v1Create(id, data);
                            }}
                            schema={{
                                content: joi.string().required(),
                            }}
                            defaultValues={{
                                content: '',
                            }}
                            onExtraSuccessAction={(_, form) => {
                                form.reset();
                                dataQuery.refetch();
                            }}
                        >
                            <div className="flex w-full flex-col gap-4 ">
                                <NKRichText label="" name="content" placeholder="Your comments" className="w-full" />
                                <div className="mt-2 flex w-full justify-end">
                                    <button className="text-base font-bold text-black">Gửi</button>
                                </div>
                            </div>
                        </NKFormWrapper>
                    </section>
                    <section id="comment" className="flex w-full flex-col gap-3">
                        {dataQuery.data?.userPostComments
                            .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
                            .map((comment) => (
                                <div key={comment.id} className="flex h-full min-h-64 w-full  overflow-hidden rounded-lg shadow">
                                    <div className="flex w-[16%] flex-shrink-0 flex-col items-center  gap-4 self-stretch  bg-green-50 p-4">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden  rounded border-2 border-green-600">
                                            <img src={comment.user.avatar} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <p className="font-medium text-gray-900">{comment.user.name}</p>
                                        <div className="flex flex-col items-center justify-center">
                                            <div
                                                onClick={() => {
                                                    if (!checkUserCommentReacted(comment)) {
                                                        reactCommentMutation.mutate({
                                                            react: 1,
                                                            id: comment.id,
                                                        });
                                                    }
                                                }}
                                                className={clsx('flex h-8 w-8 cursor-pointer flex-col items-center justify-center ', {
                                                    'text-green-600':
                                                        comment.userPostCommentLikes.findIndex((like) => like.user.id === userState.id) >= 0,
                                                    'text-gray-600':
                                                        comment.userPostCommentLikes.findIndex((like) => like.user.id === userState.id) < 0,
                                                })}
                                            >
                                                <ChevronUp className="h-full w-full" />
                                            </div>
                                            <span className="text-lg font-semibold">
                                                {comment.userPostCommentLikes.filter((like) => like.react === 1).length || 0}
                                            </span>

                                            <div
                                                onClick={() => {
                                                    if (checkUserCommentReacted(comment)) {
                                                        reactCommentMutation.mutate({
                                                            react: 0,
                                                            id: comment.id,
                                                        });
                                                    }
                                                }}
                                                className={clsx('flex h-8 w-8 cursor-pointer flex-col items-center justify-center text-red-600')}
                                            >
                                                <ChevronDown className="h-full w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex h-full w-full flex-col px-8 py-4">
                                        <div
                                            className="pop prose text-base text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: comment.content || '' }}
                                        />
                                    </div>
                                </div>
                            ))}
                    </section>
                </div>
            ) : (
                <Skeleton
                    active
                    paragraph={{
                        rows: 30,
                    }}
                />
            )}
        </div>
    );
};

export default Page;
