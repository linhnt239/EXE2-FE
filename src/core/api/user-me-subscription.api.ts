import { UserSetting } from '../models/userSetting';
import http from './http';

export interface IV1IRegisterSubscription {
    redirectUrl: string;
    subscriptionId: string;
}

export const userMeSubscriptionApi = {
    v1Get: async () => {
        const url = `/v1/user-me-subscription`;
        const res = await http.get<any>(url);
        return res.data;
    },
    v1PostRegister: async (dto: IV1IRegisterSubscription) => {
        const url = `/v1/user-me-subscription/register/${dto.subscriptionId}`;
        const res = await http.post<UserSetting>(url, { ...dto });
        return res.data;
    },
};
