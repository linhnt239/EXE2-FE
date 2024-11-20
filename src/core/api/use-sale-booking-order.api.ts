import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import { UserSaleBookingOrder } from '../models/user-sale-booking-order';
import http from './http';

const baseEndpoint = '/v1/user-sale-booking-order';

export interface UserSaleBookingOrderIV1GetDto extends IPagingDto {}

export interface UserSaleBookingOrderIV1UploadSourceDto extends Pick<UserSaleBookingOrder, 'sourceCode'> {}

export const userSaleBookingOrderApi = {
    v1Get: async (dto: UserSaleBookingOrderIV1GetDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<UserSaleBookingOrder>>(url, { params: dto });
        return res.data;
    },

    v1GetEnumStatus: async () => {
        const url = `${baseEndpoint}/enum-options/status`;
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },

    v1Select: async (search: string, isShowDelete = false) => {
        const url = `${baseEndpoint}/select-options`;
        const res = await http.get<Array<UserSaleBookingOrder>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },

    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;
        const res = await http.get<UserSaleBookingOrder[]>(url);
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<UserSaleBookingOrder>(url);
        return res.data;
    },

    v1SelectStatus: async () => {
        const url = `${baseEndpoint}/enum-options/status`;
        const res = await http.get<Array<EnumListItem>>(url);
        return res.data;
    },
    v1UploadSource: async (id: string, dto: UserSaleBookingOrderIV1UploadSourceDto) => {
        const url = `${baseEndpoint}/upload-source/${id}`;
        const res = await http.post<UserSaleBookingOrder>(url, dto);
        return res.data;
    },
};
