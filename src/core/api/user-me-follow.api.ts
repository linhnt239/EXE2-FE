import _get from 'lodash/get';

import { IPagingDto } from '../models/common';
import http from './http';

const baseEndpoint = '/v1/user-me-follow';

export interface UserMeFollowByMeIV1Get extends IPagingDto {}

export const userMeFollowApi = {
    createFollow: async (userId: string) => {
        const url = `${baseEndpoint}/user/${userId}`;
        const res = await http.post(url);
        return res.data;
    },
    getFollowByMe: async (dto: UserMeFollowByMeIV1Get) => {
        const url = `${baseEndpoint}/follow-by-me`;
        const res = await http.get(url, { params: dto });
        return res.data;
    },

    getFollowToMe: async (dto: UserMeFollowByMeIV1Get) => {
        const url = `${baseEndpoint}/follow-me`;
        const res = await http.get(url, { params: dto });
        return res.data;
    },

    isFollow: async (userId: string) => {
        const url = `${baseEndpoint}/is-follow/${userId}`;
        const res = await http.get(url);
        return _get(res, 'data.isFollowed', false);
    },
};
