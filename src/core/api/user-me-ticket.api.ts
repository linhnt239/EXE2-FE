import { UserTicket } from '../models/userTicket';
import http from './http';

export interface CreateUserMeTicket {
    name: string;
    message: string;
    type: string;
}

export const userMeTicketApi = {
    v1GetByName: async (name: string) => {
        const url = `/v1/user-me-ticket/${name}`;
        const res = await http.get<UserTicket>(url);
        return res.data;
    },
    v1PostSend: async (dto: CreateUserMeTicket) => {
        const url = '/v1/user-me-ticket/send';
        const res = await http.post<UserTicket>(url, { ...dto });
        return res.data;
    },
};
