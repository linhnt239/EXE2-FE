import { IPagingDto, ResponseList } from '../models/common';
import { Product } from '../models/product';
import http from './http';

export interface ProductIV1Get extends IPagingDto {}

export interface ProductIV1CreateDto extends Pick<Product, 'name' | 'description'> {
    productCategoryId: string;
    imageUrls: string[];
    price: number;
    quantity: number;
    isAllowBuyExceedQuantity: boolean;
}

export interface ProductIV1UpdateDto extends Pick<Product, 'name' | 'description'> {
    productCategoryId: string;
}

export const productApi = {
    v1Get: async (dto: ProductIV1Get) => {
        const url = '/v1/product';
        const res = await http.get<ResponseList<Product>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/product/${id}`;
        const res = await http.get<Product>(url);
        return res.data;
    },
    v1Create: async (dto: ProductIV1CreateDto) => {
        const url = '/v1/product';
        const res = await http.post<Product>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: ProductIV1UpdateDto) => {
        const url = `/v1/product/${id}`;
        const res = await http.put<Product>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/product/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
    v1GetAll: async () => {
        const url = '/v1/product/all';
        const res = await http.get<ResponseList<Product>>(url);
        return res.data;
    },
};
