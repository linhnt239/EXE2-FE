import { IPagingDto, ResponseList } from '../models/common';
import { Feedback } from '../models/feedback';
import { FeedbackQuestion } from '../models/feedbackQuestion';
import http from './http';

export interface FeedbackQuestionIV1Get extends IPagingDto {}

export interface FeedbackQuestionIV1CreateDto extends Pick<FeedbackQuestion, 'question' | 'index' | 'answers'> {
    feedbackId: string;
}

export interface FeedbackQuestionIV1UpdateDto extends Pick<FeedbackQuestion, 'question' | 'index' | 'answers'> {}

export const feedbackQuestionApi = {
    v1Get: async (dto: FeedbackQuestionIV1Get) => {
        const url = '/v1/feedback-question';
        const res = await http.get<ResponseList<Feedback>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/feedback-question/${id}`;
        const res = await http.get<Feedback>(url);
        return res.data;
    },
    v1Create: async (dto: FeedbackQuestionIV1CreateDto) => {
        const url = '/v1/feedback-question';
        const res = await http.post<Feedback>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: FeedbackQuestionIV1UpdateDto) => {
        const url = `/v1/feedback-question/${id}`;
        const res = await http.put<Feedback>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/feedback-question/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
