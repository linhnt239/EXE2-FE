import { Chat } from '../models/chat';
import { IPagingDto, ResponseList } from '../models/common';
import http from './http';

export interface IV1GetChat extends IPagingDto {}

export const chatApi = {
    v1GetList: async (dto: IV1GetChat) => {
        const url = '/v1/chat';
        const res = await http.get<ResponseList<Chat>>(url, { params: dto });
        return res.data;
    },
};
