import { Chat } from '../models/chat';
import { ChatMessage } from '../models/chatMessage';
import { IPagingDto, ResponseList } from '../models/common';
import http from './http';

export interface IV1CreateWithUser {
    userId: string;
    name: string;
}

export interface IV1CreateWithGroup {
    name: string;
    userId: string;
}

export interface IV1AddUsers {
    userIds: string[];
}

export interface IV1GetMessage extends IPagingDto {}

export interface IV1CreateMessage extends Pick<ChatMessage, 'content' | 'type'> {}

export interface IV1PutGroupChat extends Pick<Chat, 'name' | 'banner'> {}

export const userMeChatApi = {
    v1GetList: async (dto: IV1GetMessage) => {
        const url = '/v1/user-me-chat';
        const res = await http.get<ResponseList<Chat>>(url, { params: dto });
        return res.data;
    },

    v1PostCreateWithUser: async (dto: IV1CreateWithUser) => {
        const url = '/v1/user-me-chat/create-with-user';
        const res = await http.post<Chat>(url, dto);
        return res.data;
    },
    v1PostCreateWithGroup: async (dto: IV1CreateWithGroup) => {
        const url = '/v1/user-me-chat/create-with-group';
        const res = await http.post<Chat>(url, dto);
        return res.data;
    },

    v1PostAddUsers: async (id: string, dto: IV1AddUsers) => {
        const url = `/v1/user-me-chat/${id}/add-user`;
        const res = await http.post<Chat>(url, dto);
        return res.data;
    },

    v1PostLeave: async (id: string) => {
        const url = `/v1/user-me-chat/${id}/leave`;
        const res = await http.post<Chat>(url);
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `/v1/user-me-chat/${id}`;
        const res = await http.get<Chat>(url);
        return res.data;
    },
    v1CreateMessage: async (id: string, dto: IV1CreateMessage) => {
        const url = `/v1/user-me-chat/${id}/create-message`;
        const res = await http.post<Chat>(url, dto);
        return res.data;
    },
    v1PutGroupChat: async (id: string, dto: IV1PutGroupChat) => {
        const url = `/v1/user-me-chat/${id}/update-info`;
        const res = await http.put<Chat>(url, dto);
        return res.data;
    },
};
