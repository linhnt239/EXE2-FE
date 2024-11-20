import { IPagingDto, ResponseList } from '../models/common';
import { MusicAuthor } from '../models/musicAuthor';
import http from './http';

export interface MusicAuthorIV1Get extends IPagingDto {}

export interface MusicAuthorIV1CreateDto extends Pick<MusicAuthor, 'name' | 'description' | 'thumbnail'> {}

export interface MusicAuthorIV1UpdateDto extends Pick<MusicAuthor, 'name' | 'description' | 'thumbnail'> {}

export const musicAuthorApi = {
    v1Get: async (dto: MusicAuthorIV1Get) => {
        const url = '/v1/music-author';
        const res = await http.get<ResponseList<MusicAuthor>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/music-author/${id}`;
        const res = await http.get<MusicAuthor>(url);
        return res.data;
    },
    v1Create: async (dto: MusicAuthorIV1CreateDto) => {
        const url = '/v1/music-author';
        const res = await http.post<MusicAuthor>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: MusicAuthorIV1UpdateDto) => {
        const url = `/v1/music-author/${id}`;
        const res = await http.put<MusicAuthor>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/music-author/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string) => {
        const url = `/v1/music-author/select-options?search=${search}`;
        const res = await http.get<Array<MusicAuthor>>(url);
        return res.data;
    },
};
