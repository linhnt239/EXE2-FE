import { UserSetting } from '../models/userSetting';
import http from './http';

export interface IV1IUpdateUserMeSettingDto {
    key: string;
    value: string;
}

export const userMeSettingApi = {
    v1GetAll: async () => {
        const url = `/v1/user-me-setting/all`;
        const res = await http.get<UserSetting>(url);
        return res.data;
    },
    v1PutSetting: async (dto: IV1IUpdateUserMeSettingDto) => {
        const url = '/v1/user-me-setting/key';
        const res = await http.put<UserSetting>(url, { ...dto });
        return res.data;
    },
};
