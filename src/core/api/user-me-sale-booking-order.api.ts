import { IPagingDto, ResponseList } from '../models/common';
import { UserSaleBookingOrder } from '../models/user-sale-booking-order';
import http from './http';

const baseEndpoint = '/v1/user-me-sale-booking-order';

export interface UserMeSaleBookingOrderIV1GetDto extends IPagingDto {}
export interface UserMeSaleBookingOrderIV1CreateDto
    extends Pick<UserSaleBookingOrder, 'clientNote' | 'price' | 'extraFee' | 'startDate' | 'endDate'> {
    userSaleBookingId: string;
}
export interface UserMeSaleBookingOrderIV1UpdateDto extends Pick<UserSaleBookingOrder, 'note' | 'extraFee'> {}

export const userMeSaleBookingOrderApi = {
    v1Get: async (dto: UserMeSaleBookingOrderIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSaleBookingOrder>>(url, { params: dto });
        return res.data;
    },

    v1Post: async (dto: UserMeSaleBookingOrderIV1CreateDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<UserSaleBookingOrder>(url, dto);
        return res.data;
    },

    v1Put: async (id: string, dto: UserMeSaleBookingOrderIV1UpdateDto) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<UserSaleBookingOrder>(url, dto);
        return res.data;
    },

    v1Cancel: async (id: string) => {
        const url = `${baseEndpoint}/${id}/cancel`;
        const res = await http.delete<UserSaleBookingOrder>(url);
        return res.data;
    },

    v1Pay: async (id: string) => {
        const url = `${baseEndpoint}/${id}/pay`;
        const res = await http.post<UserSaleBookingOrder>(url);
        return res.data;
    },
};
