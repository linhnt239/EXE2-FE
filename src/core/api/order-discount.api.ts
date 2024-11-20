import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { OrderDiscount } from '../models/orderDiscount';
import http from './http';

export interface OrderDiscountIV1Get extends IPagingDto {}

export interface OrderDiscountIV1CreateDto
    extends Pick<OrderDiscount, 'name' | 'code' | 'isActive' | 'type' | 'value' | 'expiredDate' | 'activeDate' | 'numberOfUsed'> {}

export interface OrderDiscountIV1UpdateDto
    extends Pick<OrderDiscount, 'name' | 'code' | 'isActive' | 'type' | 'value' | 'expiredDate' | 'activeDate' | 'numberOfUsed'> {}

export const orderDiscountApi = {
    v1Get: async (dto: OrderDiscountIV1Get) => {
        const url = '/v1/order-discount';
        const res = await http.get<ResponseList<OrderDiscount>>(url, { params: { ...dto } });
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `/v1/order-discount/${id}`;
        const res = await http.get<OrderDiscount>(url);
        return res.data;
    },

    v1Create: async (dto: OrderDiscountIV1CreateDto) => {
        const url = '/v1/order-discount';
        const res = await http.post<OrderDiscount>(url, dto);
        return res.data;
    },

    v1Update: async (id: string, dto: OrderDiscountIV1UpdateDto) => {
        const url = `/v1/order-discount/${id}`;
        const res = await http.put<OrderDiscount>(url, dto);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `/v1/order-discount/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },

    v1GetAll: async () => {
        const url = '/v1/order-discount/all';
        const res = await http.get<OrderDiscount[]>(url);
        return res.data;
    },
    v1GetEnumType: async () => {
        const url = '/v1/order-discount/enum-options/type';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
