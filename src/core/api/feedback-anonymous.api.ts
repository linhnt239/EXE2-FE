import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { FeedbackAnonymous } from '../models/feedbackAnonymous';
import http from './http';

export interface FeedbackAnonymousIV1Get extends IPagingDto {}

export interface FeedbackAnonymousIV1UpdateDto extends Pick<FeedbackAnonymous, 'note' | 'status'> {}

export interface FeedbackAnonymousIV1CreateDto
    extends Pick<FeedbackAnonymous, 'name' | 'phone' | 'email' | 'subject' | 'description' | 'imageUrls'> {}

export const feedbackAnonymousApi = {
    v1Get: async (dto: FeedbackAnonymousIV1Get) => {
        const url = '/v1/feedback-anonymous';
        const res = await http.get<ResponseList<FeedbackAnonymous>>(url, { params: { ...dto } });
        return res.data;
    },

    v1Post: async (dto: FeedbackAnonymousIV1CreateDto) => {
        const url = '/v1/feedback-anonymous';
        const res = await http.post<FeedbackAnonymous>(url, dto);
        return res.data;
    },
    v1Put: async (id: string, dto: FeedbackAnonymousIV1UpdateDto) => {
        const url = `/v1/feedback-anonymous/${id}`;
        const res = await http.put<FeedbackAnonymous>(url, dto);
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/feedback-anonymous/${id}`;
        const res = await http.get<FeedbackAnonymous>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/feedback-anonymous/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/feedback-anonymous/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
