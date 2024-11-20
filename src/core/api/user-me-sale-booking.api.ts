import { IPagingDto, ResponseList } from '../models/common';
import { UserSaleBooking } from '../models/userSaleBooking';
import http from './http';

const baseEndpoint = '/v1/user-me-sale-booking';

export interface UserMeSaleBookingIV1GetDto extends IPagingDto {}

export interface UserMeSaleBookingIV1CreateDto extends Pick<UserSaleBooking, 'name' | 'description' | 'imageUrls' | 'price' | 'extraFee' | 'group'> {
    serviceCategoryId: string;
}

export interface UserMeSaleBookingIV1UpdateDto extends Pick<UserSaleBooking, 'name' | 'description' | 'imageUrls' | 'price' | 'extraFee' | 'group'> {
    serviceCategoryId: string;
}

export const userMeSaleBookingApi = {
    v1Get: async (dto: UserMeSaleBookingIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSaleBooking>>(url, { params: dto });
        return res.data;
    },

    v1Create: async (dto: UserMeSaleBookingIV1CreateDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<UserSaleBooking>(url, dto);
        return res.data;
    },

    v1Update: async (id: string, dto: UserMeSaleBookingIV1UpdateDto) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<UserSaleBooking>(url, dto);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.delete<UserSaleBooking>(url);
        return res.data;
    },
};
