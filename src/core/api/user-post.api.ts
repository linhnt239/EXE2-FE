import { IPagingDto, IReportDto, ReportResponse, ResponseList } from '../models/common';
import { UserPost } from '../models/userPost';
import http from './http';

export interface UserPostIV1Get extends IPagingDto {}

export interface UserPostIV1CreateDto extends Pick<UserPost, 'title' | 'tag' | 'content'> {}

export interface UserPostIV1UpdateDto extends Pick<UserPost, 'tag' | 'content'> {}

export const userPostApi = {
    v1Get: async (dto: UserPostIV1Get) => {
        const url = '/v1/user-post';
        const res = await http.get<ResponseList<UserPost>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/user-post/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/user-post/${id}`;
        const res = await http.get<UserPost>(url);
        return res.data;
    },
    v1Create: async (dto: UserPostIV1CreateDto) => {
        const url = '/v1/user-post';
        const res = await http.post<UserPost>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: UserPostIV1UpdateDto) => {
        const url = `/v1/user-post/${id}`;
        const res = await http.put<UserPost>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/user-post/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
