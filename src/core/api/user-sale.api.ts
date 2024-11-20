import { IPagingDto, ResponseList } from '../models/common';
import { UserSale } from '../models/userSale';
import http from './http';

const baseEndpoint = '/v1/user-sale';

export interface UserSaleIV1GetDto extends IPagingDto {}

export const userSaleApi = {
    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<UserSale>(url);
        return res.data;
    },

    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;
        const res = await http.get<UserSale[]>(url);
        return res.data;
    },

    v1Get: async (dto: UserSaleIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSale>>(url, { params: dto });
        return res.data;
    },
};
