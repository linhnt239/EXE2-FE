import { IPagingDto, ResponseList } from '../models/common';
import { PhotoGroup } from '../models/photoGroup';
import http from './http';

export interface PhotoGroupIV1Get extends IPagingDto {}

export interface PhotoGroupIV1CreateDto extends Pick<PhotoGroup, 'name' | 'description' | 'imageUrls'> {}
export interface PhotoGroupIV1UpdateDto extends Pick<PhotoGroup, 'name' | 'description' | 'imageUrls'> {}

export const photoGroupApi = {
    v1Get: async (dto: PhotoGroupIV1Get) => {
        const url = '/v1/photo-group';
        const res = await http.get<ResponseList<PhotoGroup>>(url, { params: { ...dto } });
        return res.data;
    },

    v1GetById: async (id: string) => {
        const url = `/v1/photo-group/${id}`;
        const res = await http.get<PhotoGroup>(url);
        return res.data;
    },

    v1Create: async (dto: PhotoGroupIV1CreateDto) => {
        const url = '/v1/photo-group';
        const res = await http.post<PhotoGroup>(url, dto);
        return res.data;
    },

    v1Update: async (id: string, dto: PhotoGroupIV1UpdateDto) => {
        const url = `/v1/photo-group/${id}`;
        const res = await http.put<PhotoGroup>(url, dto);
        return res.data;
    },

    v1Delete: async (id: string) => {
        const url = `/v1/photo-group/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },

    v1GetAll: async () => {
        const url = '/v1/photo-group/all';
        const res = await http.get<PhotoGroup[]>(url);
        return res.data;
    },
};
