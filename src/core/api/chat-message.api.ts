import { Language } from '../models/chatMessage';
import { ResponseList } from '../models/common';
import http from './http';

export const chatMessageApi = {
    v1GetEnumLanguage: async () => {
        const url = '/v1/chat-message/enum-options/language';
        const res = await http.get<Language[]>(url);
        return res.data;
    },
};
