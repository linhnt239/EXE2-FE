import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { UserSaleBooking } from '../models/userSaleBooking';
import http from './http';

const baseEndpoint = '/v1/user-sale-booking';

export interface UserSaleBookingIV1GetDto extends IPagingDto {}

export const userSaleBookingApi = {
    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<UserSaleBooking>(url);
        return res.data;
    },

    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;
        const res = await http.get<UserSaleBooking[]>(url);
        return res.data;
    },

    v1Get: async (dto: UserSaleBookingIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSaleBooking>>(url, { params: dto });
        return res.data;
    },

    v1Select: async (search: string, isShowDelete = false) => {
        const url = `${baseEndpoint}/select-options`;
        const res = await http.get<Array<UserSaleBooking>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },
    v1SelectStatus: async () => {
        const url = `${baseEndpoint}/enum-options/status`;
        const res = await http.get<Array<EnumListItem>>(url);
        return res.data;
    },
};
