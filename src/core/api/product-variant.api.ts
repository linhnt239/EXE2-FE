import { IPagingDto, ResponseList } from '../models/common';
import { ProductCategory } from '../models/productCategory';
import { ProductVariant } from '../models/productVariant';
import http from './http';

export interface ProductVariantIV1Get extends IPagingDto {}

export interface ProductVariantIV1CreateDto
    extends Pick<ProductVariant, 'name' | 'description' | 'imageUrls' | 'price' | 'quantity' | 'isAllowBuyExceedQuantity'> {
    productId: string;
}

export interface ProductVariantIV1UpdateDto
    extends Pick<ProductVariant, 'name' | 'description' | 'imageUrls' | 'price' | 'isAllowBuyExceedQuantity'> {}

export interface ProductVariantIV1ImportDto {
    quantity: number;
}

export const productVariantApi = {
    v1Get: async (dto: ProductVariantIV1Get) => {
        const url = '/v1/product-variant';
        const res = await http.get<ResponseList<ProductCategory>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetById: async (id: string) => {
        const url = `/v1/product-variant/${id}`;
        const res = await http.get<ProductCategory>(url);
        return res.data;
    },
    v1Create: async (dto: ProductVariantIV1CreateDto) => {
        const url = '/v1/product-variant';
        const res = await http.post<ProductCategory>(url, dto);
        return res.data;
    },
    v1Import: async (id: string, dto: ProductVariantIV1ImportDto) => {
        const url = `/v1/product-variant/import-quantity/${id}`;
        const res = await http.put<boolean>(url, dto);
        return res.data;
    },
    v1Update: async (id: string, dto: ProductVariantIV1UpdateDto) => {
        const url = `/v1/product-variant/${id}`;
        const res = await http.put<ProductCategory>(url, dto);
        return res.data;
    },
    v1Delete: async (id: string) => {
        const url = `/v1/product-variant/${id}`;
        const res = await http.delete<boolean>(url);
        return res.data;
    },
};
