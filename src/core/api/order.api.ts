import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { Order } from '../models/order';
import http from './http';

export interface OrderIV1Get extends IPagingDto {}
export interface UpdateOrderIV1Put extends Pick<Order, 'note' | 'name' | 'address' | 'phone'> {}

export const orderApi = {
    v1Get: async (dto: OrderIV1Get) => {
        const url = '/v1/order';
        const res = await http.get<ResponseList<Order>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetPrice: async (id: string) => {
        const url = `/v1/order/cart-price/${id}`;
        const res = await http.get<Order>(url);
        return res.data;
    },
    v1Put: async (id: string, dto: UpdateOrderIV1Put) => {
        const url = `/v1/order/${id}`;
        const res = await http.put<Order>(url, dto);
        return res.data;
    },
    v1PostMarkAsPaid: async (id: string) => {
        const url = `/v1/order/mark-as-paid/${id}`;
        const res = await http.post<Order>(url);
        return res.data;
    },
    v1PostMarkAsCanceled: async (id: string) => {
        const url = `/v1/order/mark-as-canceled/${id}`;
        const res = await http.post<Order>(url);
        return res.data;
    },
    v1GetAll: async () => {
        const url = '/v1/order/all';
        const res = await http.get<Order[]>(url);
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/order/${id}`;
        const res = await http.get<Order>(url);
        return res.data;
    },
    v1GetEnumType: async () => {
        const url = '/v1/order/enum-options/type';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/order/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
