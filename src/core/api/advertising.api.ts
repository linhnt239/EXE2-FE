import { Advertising } from '../models/advertising';
import { EnumListItem, IPagingDto, ResponseList } from '../models/common';
import http from './http';

export interface AdvertisingIV1Get extends IPagingDto {}

export interface AdvertisingIV1CreateDto
    extends Pick<Advertising, 'name' | 'description' | 'slug' | 'group' | 'default' | 'contents' | 'cycleTime' | 'type'> {}

export interface AdvertisingIV1UpdateDto
    extends Pick<Advertising, 'name' | 'description' | 'slug' | 'group' | 'default' | 'contents' | 'cycleTime' | 'type'> {}

export const advertisingApi = {
    v1Get: async (dto: AdvertisingIV1Get) => {
        const url = '/v1/advertising';
        const res = await http.get<ResponseList<Advertising>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetAll: async () => {
        const url = '/v1/advertising/all';
        const res = await http.get<Advertising[]>(url);
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/advertising/${id}`;
        const res = await http.get<Advertising>(url);
        return res.data;
    },
    v1GetBySlug: async (slug: string) => {
        const url = `/v1/advertising/slug/${slug}`;
        const res = await http.get<Advertising>(url);
        return res.data;
    },
    v1Create: async (dto: AdvertisingIV1CreateDto) => {
        const url = '/v1/advertising';
        const res = await http.post<Advertising>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: AdvertisingIV1UpdateDto) => {
        const url = `/v1/advertising/${id}`;
        const res = await http.put<Advertising>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/advertising/${id}`;
        const res = await http.delete<Advertising>(url);
        return res.data;
    },
    v1GetEnumStatus: async () => {
        const url = '/v1/advertising/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
};
