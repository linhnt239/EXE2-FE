import { IPagingDto, ResponseList } from '../models/common';
import { UserReview } from '../models/userReview';
import http from './http';

const baseEndpoint = '/v1/user-me-review';

export interface UserMeReviewIV1GetDto extends IPagingDto {}

export interface UserMeReviewIV1CreateDto extends Pick<UserReview, 'rate' | 'content' | 'imageUrls'> {
    userId: string;
}

export interface UserMeReviewIV1UpdateDto extends Pick<UserReview, 'rate' | 'content' | 'imageUrls'> {
    userId: string;
}

export const userMeReviewApi = {
    v1Create: async (dto: UserMeReviewIV1CreateDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<UserReview>(url, dto);
        return res.data;
    },

    v1Update: async (id: string, dto: UserMeReviewIV1UpdateDto) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<UserReview>(url, dto);
        return res.data;
    },

    v1Get: async (dto: UserMeReviewIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserReview>>(url, { params: dto });
        return res.data;
    },
};
