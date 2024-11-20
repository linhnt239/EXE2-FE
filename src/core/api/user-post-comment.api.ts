import { UserPost } from '../models/userPost';
import { UserPostComment } from '../models/userPostComment';
import http from './http';

export interface UserPostCommentIV1CreateDto extends Pick<UserPostComment, 'content'> {}

export interface UserPostCommentIV1UpdateDto extends Pick<UserPostComment, 'content'> {}

export const userPostCommentApi = {
    v1Create: async (id: string, dto: UserPostCommentIV1CreateDto) => {
        const url = `/v1/user-post-comment/${id}`;
        const res = await http.post<UserPost>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: UserPostCommentIV1UpdateDto) => {
        const url = `/v1/user-post-comment/${id}`;
        const res = await http.put<UserPost>(url, dto);
        return res.data;
    },
};
