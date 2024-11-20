import { IPagingDto, ResponseList } from '../models/common';
import { UserNotification } from '../models/userNotification';
import http from './http';

export interface UserMeNotificationIV1Get extends IPagingDto {}

export const userMeNotificationApi = {
    v1Get: async (dto: UserMeNotificationIV1Get) => {
        const url = '/v1/user-me-notification';
        const res = await http.get<ResponseList<UserNotification>>(url, { params: dto });
        return res.data;
    },
    v1PutMarkAsRead: async () => {
        const url = '/v1/user-me-notification/mark-as-read';
        const res = await http.put(url);
        return res.data;
    },
    v1GetCountUnread: async () => {
        const url = '/v1/user-me-notification/unread-count';
        const res = await http.get<number>(url);
        return res.data;
    },
};
