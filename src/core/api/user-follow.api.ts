import _get from 'lodash/get';

import { IPagingDto } from '../models/common';
import http from './http';

const baseEndpoint = '/v1/user-follow';

export interface UserMeFollowByMeIV1Get extends IPagingDto {}

export const userFollowApi = {
    countFollowBy: async (userId: string) => {
        const url = `${baseEndpoint}/count-follow-by/${userId}`;
        const res = await http.get(url);
        return _get(res, 'data', 0);
    },

    countFollowTo: async (userId: string) => {
        const url = `${baseEndpoint}/count-follow/${userId}`;
        const res = await http.get(url);
        return _get(res, 'data', 0);
    },
};
