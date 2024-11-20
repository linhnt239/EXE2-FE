import { User } from '../models/user';
import http from './http';

export interface IV1AuthRegister extends Pick<User, 'email' | 'password' | 'name' | 'username'> {}
export interface IV1AuthLoginEmail extends Pick<User, 'email' | 'password'> {}
export interface IV1AuthLoginUsername extends Pick<User, 'username' | 'password'> {}

export const authApi = {
    v1LoginEmail: async (dto: IV1AuthLoginEmail) => {
        const url = '/v1/auth/login-email';
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
    V1LoginUsername: async (dto: IV1AuthLoginUsername) => {
        const url = '/v1/auth/login-username';
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
    v1Register: async (dto: IV1AuthRegister) => {
        const url = '/v1/auth/register';
        const res = await http.post<{ token: string }>(url, dto);
        return res.data;
    },
};
