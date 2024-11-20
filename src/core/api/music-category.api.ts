import { IPagingDto, ResponseList } from '../models/common';
import { MusicCategory } from '../models/musicCategory';
import http from './http';

export interface MusicCategoryIV1Get extends IPagingDto {}

export interface MusicCategoryIV1CreateDto extends Pick<MusicCategory, 'name' | 'description' | 'thumbnail'> {}

export interface MusicCategoryIV1UpdateDto extends Pick<MusicCategory, 'name' | 'description' | 'thumbnail'> {}

export const musicCategoryApi = {
    v1Get: async (dto: MusicCategoryIV1Get) => {
        const url = '/v1/music-category';
        const res = await http.get<ResponseList<MusicCategory>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/music-category/${id}`;
        const res = await http.get<MusicCategory>(url);
        return res.data;
    },
    v1Create: async (dto: MusicCategoryIV1CreateDto) => {
        const url = '/v1/music-category';
        const res = await http.post<MusicCategory>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: MusicCategoryIV1UpdateDto) => {
        const url = `/v1/music-category/${id}`;
        const res = await http.put<MusicCategory>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/music-category/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string) => {
        const url = `/v1/music-category/select-options?search=${search}`;
        const res = await http.get<Array<MusicCategory>>(url);
        return res.data;
    },
};
