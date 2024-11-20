import { IPagingDto, ResponseList } from '../models/common';
import { ProductCategory } from '../models/productCategory';
import http from './http';

export interface ProductCategoryIV1Get extends IPagingDto {}

export interface ProductCategoryIV1CreateDto extends Pick<ProductCategory, 'name' | 'description' | 'thumbnail'> {}

export interface ProductCategoryIV1UpdateDto extends Pick<ProductCategory, 'name' | 'description' | 'thumbnail'> {}

export const productCategoryApi = {
    v1Get: async (dto: ProductCategoryIV1Get) => {
        const url = '/v1/product-category';
        const res = await http.get<ResponseList<ProductCategory>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/product-category/${id}`;
        const res = await http.get<ProductCategory>(url);
        return res.data;
    },
    v1Create: async (dto: ProductCategoryIV1CreateDto) => {
        const url = '/v1/product-category';
        const res = await http.post<ProductCategory>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: ProductCategoryIV1UpdateDto) => {
        const url = `/v1/product-category/${id}`;
        const res = await http.put<ProductCategory>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/product-category/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1Select: async (search: string) => {
        const url = `/v1/product-category/select-options?search=${search}`;
        const res = await http.get<Array<ProductCategory>>(url);
        return res.data;
    },
    v1GetAll: async () => {
        const url = `/v1/product-category/all`;
        const res = await http.get<Array<ProductCategory>>(url);
        return res.data;
    },
};
