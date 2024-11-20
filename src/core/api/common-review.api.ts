import { IPagingDto, ResponseList } from '../models/common';
import { CommonReview } from '../models/commonReview';
import { FeedbackAnonymous } from '../models/feedbackAnonymous';
import http from './http';

export interface CommonReviewIV1Get extends IPagingDto {}

export interface CommonReviewIV1Create extends Pick<CommonReview, 'rate' | 'content' | 'imageUrls' | 'ownerId' | 'subOwnerId'> {}

const baseEndpoint = '/v1/common-review';

export const commonReviewApi = {
    v1Get: async (dto: CommonReviewIV1Get) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<CommonReview>>(url, { params: { ...dto } });
        return res.data;
    },

    v1Post: async (dto: CommonReviewIV1Create) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<CommonReview>(url, dto);
        return res.data;
    },
};
