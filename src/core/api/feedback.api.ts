import { IPagingDto, ResponseList } from '../models/common';
import { Feedback } from '../models/feedback';
import http from './http';

export interface FeedbackIV1Get extends IPagingDto {}

export interface FeedbackIV1CreateDto extends Pick<Feedback, 'name' | 'code' | 'isActive' | 'description'> {}

export interface FeedbackIV1UpdateDto extends Pick<Feedback, 'name' | 'code' | 'isActive' | 'description'> {}

export const feedbackApi = {
    v1Get: async (dto: FeedbackIV1Get) => {
        const url = '/v1/feedback';
        const res = await http.get<ResponseList<Feedback>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/feedback/${id}`;
        const res = await http.get<Feedback>(url);
        return res.data;
    },
    v1Create: async (dto: FeedbackIV1CreateDto) => {
        const url = '/v1/feedback';
        const res = await http.post<Feedback>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: FeedbackIV1UpdateDto) => {
        const url = `/v1/feedback/${id}`;
        const res = await http.put<Feedback>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/feedback/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
