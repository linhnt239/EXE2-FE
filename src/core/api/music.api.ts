import { IPagingDto, ResponseList } from '../models/common';
import { Music } from '../models/music';
import http from './http';

export interface MusicIV1Get extends IPagingDto {}

export interface MusicIV1CreateDto extends Pick<Music, 'name' | 'description' | 'point' | 'thumbnail' | 'link'> {
    musicCategoryId: string;
    musicAuthorId: string;
}

export interface MusicIV1UpdateDto extends Pick<Music, 'name' | 'description' | 'point' | 'thumbnail' | 'link'> {
    musicCategoryId: string;
    musicAuthorId: string;
}

export const musicApi = {
    v1Get: async (dto: MusicIV1Get) => {
        const url = '/v1/music';
        const res = await http.get<ResponseList<Music>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetAll: async () => {
        const url = '/v1/music/all';
        const res = await http.get<Music[]>(url);
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/music/${id}`;
        const res = await http.get<Music>(url);
        return res.data;
    },
    v1Create: async (dto: MusicIV1CreateDto) => {
        const url = '/v1/music';
        const res = await http.post<Music>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: MusicIV1UpdateDto) => {
        const url = `/v1/music/${id}`;
        const res = await http.put<Music>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/music/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
