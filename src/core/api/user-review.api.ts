import { IPagingDto, ResponseList } from '../models/common';
import { UserReview } from '../models/userReview';
import http from './http';

const baseEndpoint = '/v1/user-me-review';

export interface UserReviewIV1GetDto extends IPagingDto {}

export const userReviewApi = {
    v1Get: async (dto: UserReviewIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserReview>>(url, { params: dto });
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<UserReview>(url);
        return res.data;
    },

    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;
        const res = await http.get<UserReview[]>(url);
        return res.data;
    },
};
