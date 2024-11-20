import { IPagingDto, ResponseList } from '../models/common';
import { UserSale } from '../models/userSale';
import http from './http';

const baseEndpoint = '/v1/user-me-sale';

export interface UserMeSaleIV1GetDto extends IPagingDto {}

export interface UserMeSaleIV1CreateDto extends Pick<UserSale, 'name' | 'description' | 'price' | 'imageUrls'> {
    productCategoryId: string;
}

export interface UserMeSaleIV1UpdateDto extends Pick<UserSale, 'name' | 'description' | 'price' | 'imageUrls'> {
    productCategoryId: string;
}

export const userMeSaleApi = {
    v1Create: async (dto: UserMeSaleIV1CreateDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<UserSale>(url, dto);
        return res.data;
    },

    v1Update: async (id: string, dto: UserMeSaleIV1UpdateDto) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<UserSale>(url, dto);
        return res.data;
    },

    v1Get: async (dto: UserMeSaleIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSale>>(url, { params: dto });
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<UserSale>(url);
        return res.data;
    },

    v1Delete : async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.delete<UserSale>(url);
        return res.data;
    }
};
