import { IPagingDto, ResponseList } from '../models/common';
import { UserRole } from '../models/userRole';
import { UserTicket } from '../models/userTicket';
import { UserTicketMessage } from '../models/userTicketMessage';
import http from './http';

export interface UserTicketIV1Get extends IPagingDto {}

export interface SendUserTicketIV1Post extends Pick<UserTicketMessage, 'content'> {}

export const userTicketApi = {
    v1All: async () => {
        const url = '/v1/user-ticket/all';
        const res = await http.get<UserTicket[]>(url);
        return res.data;
    },
    v1Get: async (dto: UserTicketIV1Get) => {
        const url = '/v1/user-ticket';
        const res = await http.get<ResponseList<UserTicket>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-ticket/${id}`;
        const res = await http.get<UserTicket>(url);
        return res.data;
    },
    v1PostSendById: async (id: string, dto: SendUserTicketIV1Post) => {
        const url = `/v1/user-ticket/${id}/send`;
        const res = await http.post<UserTicket>(url, { ...dto });
        return res.data;
    },
};
