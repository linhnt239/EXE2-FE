import { IPagingDto, ResponseList } from '../models/common';
import { User } from '../models/user';
import http from './http';

export interface UserIV1Get extends IPagingDto {}

export const userAdminApi = {
    v1Get: async (dto: UserIV1Get) => {
        const url = '/v1/user-admin';
        const res = await http.get<ResponseList<User>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-admin/${id}`;
        const res = await http.get<User>(url);
        return res.data;
    },
};
