import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { UserPost } from '../models/userPost';
import { UserPostLike } from '../models/userPostLike';
import http from './http';

export interface UserPostLikeIV1CreateDto extends Pick<UserPostLike, 'react'> {}

export const userPostLikeApi = {
    v1Create: async (id: string, dto: UserPostLikeIV1CreateDto) => {
        const url = `/v1/user-post-like/${id}`;
        const res = await http.post<UserPost>(url, dto);
        return res.data;
    },
    v1GetEnumReact: async () => {
        const url = '/v1/user-post-like/enum-options/react';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
