import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChatDots, ChevronUp } from 'akar-icons';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { UserPostLikeIV1CreateDto, userPostLikeApi } from '@/core/api/user-post-like.api';
import { userPostApi } from '@/core/api/user-post.api';
import { UserPost } from '@/core/models/userPost';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { removeHtmlTag } from '@/core/utils/string.helper';

interface ForumMiniCardProps {
    data: UserPost;
}

const ForumMiniCard: React.FunctionComponent<ForumMiniCardProps> = ({ data }) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const dataQuery = useQuery(['userPostApi.v1Get', data.id], () => userPostApi.v1GetById(data.id), {
        initialData: data,
    });

    const reactMutation = useMutation(
        async (dto: UserPostLikeIV1CreateDto) => {
            return await userPostLikeApi.v1Create(data.id, dto);
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

    return (
        <div className="flex h-20 gap-6 rounded-lg border border-gray-300 py-2 pl-2 pr-6">
            <button
                onClick={() => reactMutation.mutate({ react: checkUserReacted(dataQuery.data) ? 0 : 1 })}
                className={clsx('flex h-full w-16 flex-shrink-0 flex-col items-center justify-center rounded border border-current', {
                    'text-green-400': dataQuery.data.userPostLikes.findIndex((like) => like.user.id === userState.id) >= 0,
                    'text-gray-600': dataQuery.data.userPostLikes.findIndex((like) => like.user.id === userState.id) < 0,
                })}
            >
                <ChevronUp size={20} />
                <p className="text-base font-medium ">{dataQuery.data.userPostLikes.length}</p>
            </button>
            <div className="flex w-full flex-col justify-between">
                <div className="flex w-full flex-col">
                    <Link
                        href={NKRouter.forum.detail(dataQuery.data.id)}
                        className="line-clamp-1 font-semibold text-black duration-200 hover:text-green-500 "
                    >
                        {dataQuery.data.title}
                    </Link>
                    <p className="line-clamp-1 text-sm text-gray-500">{removeHtmlTag(dataQuery.data.content)}</p>
                </div>
                <Link
                    href={`${NKRouter.forum.detail(dataQuery.data.id)}#comment`}
                    className="flex justify-end gap-1 text-gray-800 duration-200 hover:text-green-500"
                >
                    <p className="text-xs font-medium">{dataQuery.data.userPostComments.length}</p>
                    <div className="h-4 w-4 flex-shrink-0 ">
                        <ChatDots strokeWidth={2} className="h-full w-full" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ForumMiniCard;
