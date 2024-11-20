import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import * as joi from 'joi';
import moment from 'moment';
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { UserPostCommentLikeIV1CreateDto, userPostCommentLikeApi } from '@/core/api/user-post-comment-like.api';
import { userPostCommentApi } from '@/core/api/user-post-comment.api';
import { UserPostLikeIV1CreateDto, userPostLikeApi } from '@/core/api/user-post-like.api';
import { UserPostIV1CreateDto, userPostApi } from '@/core/api/user-post.api';
import { NKRichTextProps } from '@/core/components/form/NKRichText';
import { UserPost } from '@/core/models/userPost';
import { UserPostComment } from '@/core/models/userPostComment';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

import NKFormWrapper from '../form/NKFormWrapper';

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false }) as React.FC<NKRichTextProps>;

interface PostCardProps {
    data: UserPost;
    className?: string;
}

const PostCard: React.FunctionComponent<PostCardProps> = ({ data, className = '' }) => {
    const { id } = useSelector<RootState, UserState>((state) => state.user);

    const postQuery = useQuery(['userPostApi.v1Get', data.id], () => userPostApi.v1GetById(data.id), {
        initialData: data,
    });

    const query = useQueryClient();

    const reactMutation = useMutation(
        async (dto: UserPostLikeIV1CreateDto) => {
            return await userPostLikeApi.v1Create(data.id, dto);
        },
        {
            onSuccess: () => {
                query.invalidateQueries();
            },
        },
    );

    const reactCommentMutation = useMutation(
        async (dto: UserPostCommentLikeIV1CreateDto) => {
            return await userPostCommentLikeApi.v1Create(dto);
        },
        {
            onSuccess: () => {
                query.invalidateQueries();
            },
        },
    );

    const removePostMutation = useMutation(
        async (id: string) => {
            return await userPostApi.v1Delete(id);
        },
        {
            onSuccess: () => {
                query.invalidateQueries();
            },
        },
    );

    const checkUserReacted = (post: UserPost) => {
        const index = post.userPostLikes.findIndex((reaction) => reaction.user.id === id && reaction.react === 1);
        if (index === -1) {
            return false;
        }
        return true;
    };

    const checkUserCommentReacted = (comment: UserPostComment) => {
        const index = comment.userPostCommentLikes.findIndex((reaction) => reaction.user.id === id && reaction.react === 1);
        if (index === -1) {
            return false;
        }
        return true;
    };

    const [showMore, setShowMore] = React.useState<boolean>(false);

    const [openComment, setOpenComment] = React.useState<boolean>(false);

    const [openEditPost, setOpenEditPost] = React.useState<boolean>(false);

    const [openDelete, setOpenDelete] = React.useState<boolean>(false);

    return (
        <div className={clsx('flex min-h-20 w-full flex-col items-start  justify-between gap-1 bg-[#E6EEFA] p-3 duration-300', className)}>
            <div className="flex w-full gap-3">
                <div className="flex w-full flex-col gap-2 ">
                    <div className="flex w-full items-center justify-between gap-4">
                        <Link href={NKRouter.app.post.user(postQuery.data.user.id)}>
                            <figure className="flex h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                                <img src={`${postQuery.data.user.avatar}`} alt="" className="h-full w-full object-cover" />
                            </figure>
                        </Link>
                        <div className="w-full flex-col items-start  gap-1 text-black">
                            <Link href={NKRouter.app.post.user(postQuery.data.user.id)}>
                                <p className="text-sm font-bold">{postQuery.data.user.name}</p>
                            </Link>
                            <p className="text-sm font-light">{moment(postQuery.data.createdAt).fromNow()}</p>
                        </div>
                        {/* <Menu>
                                <div className="relative">
                                    <Menu.Button className="text-xl">
                                        <HiDotsHorizontal />
                                    </Menu.Button>
                                    <Menu.Items className="absolute top-full right-0 bg-gray-100 border border-gray-900 divide-x-0 divide-black rounded-lg text-gray-900 flex flex-col w-40 text-sm gap-2  px-2 py-4">
                                        <button>Edit</button>
                                        <button onClick={() => removePostMutation.mutateAsync(data.id)}>Delete</button>
                                    </Menu.Items>
                                </div>
                            </Menu> */}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: postQuery.data.content,
                        }}
                        className="prose post-content prose-img:rounded-xl prose-img:m-0 text-base font-normal"
                    />
                    <div
                        className={clsx('mt-2 flex w-full justify-start gap-[52px]', {
                            'border-b border-gray-300 pb-3': openComment,
                        })}
                    >
                        <button
                            className="flex items-center gap-3 outline-none"
                            onClick={() => reactMutation.mutateAsync({ react: checkUserReacted(postQuery.data) ? 0 : 1 })}
                        >
                            {!checkUserReacted(postQuery.data) ? (
                                <div className="text-xl">
                                    <AiOutlineHeart />
                                </div>
                            ) : (
                                <div className="text-xl text-[#F4245E]">
                                    <AiFillHeart />
                                </div>
                            )}
                            <p className="text-xs">{postQuery.data.userPostLikes.filter((reaction) => reaction.react !== 0).length}</p>
                        </button>
                        <button className="flex items-center gap-3 outline-none" onClick={() => setOpenComment(!openComment)}>
                            <div className="text-lg">
                                <FaRegCommentAlt />
                            </div>

                            <p className="text-xs">{postQuery.data.userPostComments.length}</p>
                        </button>
                    </div>
                </div>
            </div>

            {openComment && (
                <div className="flex w-full flex-col gap-3 pb-3 ">
                    <div className="w-full">
                        <NKFormWrapper<UserPostIV1CreateDto>
                            apiAction={(dto) => {
                                return userPostCommentApi.v1Create(data.id, dto);
                            }}
                            schema={{
                                title: joi.string().optional(),
                                content: joi.string().required(),
                                tag: joi.any(),
                            }}
                            defaultValues={{
                                title: '',
                                content: '',
                                tag: '',
                            }}
                            onExtraSuccessAction={(_, methods) => {
                                postQuery.refetch();
                                methods.reset();
                            }}
                        >
                            <div className="flex w-full flex-col items-center gap-4 border-b border-gray-300 pb-2">
                                <NKRichText label="" name="content" placeholder="Viết bình luận" className="w-full" />
                                <div className="flex w-full justify-end">
                                    <button className="text-sm font-bold text-black">Đăng</button>
                                </div>
                            </div>
                        </NKFormWrapper>
                    </div>

                    <div className="divide-y-1 flex flex-col  gap-4 pl-1">
                        {postQuery.data.userPostComments
                            .sort((a, b) => {
                                return moment(b.createdAt).diff(moment(a.createdAt));
                            })
                            .slice(0, showMore ? postQuery.data.userPostComments.length : 2)
                            .map((comment, index) => (
                                <div
                                    key={comment.id}
                                    className={clsx('flex w-full flex-col gap-2 ', {
                                        'border-t border-gray-200 pt-2': index !== postQuery.data.userPostComments.length - 1 && index !== 0,
                                    })}
                                >
                                    <div className="flex  items-center gap-3">
                                        <figure className="flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                            <img src={`${postQuery.data.user.avatar}`} alt="" className="h-full w-full object-cover" />
                                        </figure>
                                        <div className="flex w-full items-center justify-between gap-1 text-black">
                                            <p className="text-sm font-bold">{comment.user.name}</p>
                                            <p className="text-sm font-light">{moment(comment.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col gap-2 pl-2">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: comment.content,
                                            }}
                                            className="prose post-content prose-img:rounded-xl prose-img:m-0 text-base font-normal"
                                        />
                                        <div className="flex w-full justify-start gap-[52px] ">
                                            <button
                                                className="flex items-center gap-3 outline-none"
                                                onClick={() =>
                                                    reactCommentMutation.mutateAsync(
                                                        {
                                                            react: checkUserCommentReacted(comment) ? 0 : 1,
                                                            id: comment.id,
                                                        },
                                                        {
                                                            onSuccess: () => {
                                                                postQuery.refetch();
                                                            },
                                                        },
                                                    )
                                                }
                                            >
                                                {!checkUserCommentReacted(comment) ? (
                                                    <div className="text-xl">
                                                        <AiOutlineHeart />
                                                    </div>
                                                ) : (
                                                    <div className="text-xl text-[#F4245E]">
                                                        <AiFillHeart />
                                                    </div>
                                                )}
                                                <p className="text-xs">
                                                    {comment.userPostCommentLikes.filter((reaction) => reaction.react !== 0).length}
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {data.userPostComments.length > 2 && (
                            <div className="flex w-full items-center justify-end gap-5 text-sm text-gray-600">
                                <button onClick={() => setShowMore(!showMore)}>{!showMore ? 'Xem thêm' : 'Thu gọn'}</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
