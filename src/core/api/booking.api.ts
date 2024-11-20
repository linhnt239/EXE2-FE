import { Booking } from '../models/booking';
import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import http from './http';

export interface BookingIV1Get extends IPagingDto {}

export interface BookingIV1CreateDto extends Pick<Booking, 'name' | 'description' | 'imageUrl'> {
    password: string;
    email: string;
    age: number;
    gender: string;
}

export interface BookingIV1UpdateDto extends Pick<Booking, 'name' | 'description' | 'imageUrl' | 'status'> {}

export const bookingApi = {
    v1Get: async (dto: BookingIV1Get) => {
        const url = '/v1/booking';
        const res = await http.get<ResponseList<Booking>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetAll: async () => {
        const url = '/v1/booking/all';
        const res = await http.get<Booking[]>(url);
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/booking/${id}`;
        const res = await http.get<Booking>(url);
        return res.data;
    },
    v1Create: async (dto: BookingIV1CreateDto) => {
        const url = '/v1/booking';
        const res = await http.post<Booking>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: BookingIV1UpdateDto) => {
        const url = `/v1/booking/${id}`;
        const res = await http.put<Booking>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/booking/${id}`;
        const res = await http.delete<Booking>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/booking/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1GetMeBooking: async () => {
        const url = '/v1/user-me-booking';
        const res = await http.get<Booking>(url);
        return res.data;
    },
};
