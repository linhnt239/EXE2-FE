import { IPagingDto, ResponseList } from '../models/common';
import { ServiceCategory } from '../models/serviceCategory';
import http from './http';

export interface ServiceCategoryIV1Get extends IPagingDto {}

export interface ServiceCategoryIV1CreateDto extends Pick<ServiceCategory, 'name' | 'description' | 'thumbnail'> {}

export interface ServiceCategoryIV1UpdateDto extends Pick<ServiceCategory, 'name' | 'description' | 'thumbnail'> {}

const baseEndpoint = '/v1/service-category';

export const serviceCategoryApi = {
    v1Get: async (dto: ServiceCategoryIV1Get) => {
        const url = `${baseEndpoint}`;
        const res = await http.get<ResponseList<ServiceCategory>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.get<ServiceCategory>(url);
        return res.data;
    },
    v1Create: async (dto: ServiceCategoryIV1CreateDto) => {
        const url = `${baseEndpoint}`;
        const res = await http.post<ServiceCategory>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: ServiceCategoryIV1UpdateDto) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.put<ServiceCategory>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `${baseEndpoint}/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string, isShowDelete = false) => {
        const url = `${baseEndpoint}/select-options`;
        const res = await http.get<Array<ServiceCategory>>(url, {
            params: {
                search,
                isShowDelete,
            },
        });
        return res.data;
    },

    v1GetAll: async () => {
        const url = `${baseEndpoint}/all`;
        const res = await http.get<Array<ServiceCategory>>(url);
        return res.data;
    },
};
