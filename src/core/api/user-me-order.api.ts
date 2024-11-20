import { IPagingDto, ResponseList } from '../models/common';
import { Order } from '../models/order';
import { ProductVariant } from '../models/productVariant';
import { UserTicket } from '../models/userTicket';
import http from './http';

export interface OrderMeIV1Get extends IPagingDto {}
export interface AddToCartIV1Post extends Pick<ProductVariant, 'quantity'> {
    productVariantId: string;
}
export interface ApplyDiscountIV1Post {
    code: string;
}
export interface IV1Checkout {
    redirectUrl: string;
    orderId: string;
}

export interface IV1MakeOrder extends Pick<Order, 'address' | 'phone' | 'name' | 'paymentMethod' | 'extraFee'> {}

export const userMeOrderApi = {
    v1Get: async (dto: OrderMeIV1Get) => {
        const url = '/v1/user-me-order';
        const res = await http.get<ResponseList<Order>>(url, { params: { ...dto } });
        return res.data;
    },
    v1GetCart: async () => {
        const url = '/v1/user-me-order/cart';
        const res = await http.get<Order>(url);
        return res.data;
    },
    v1PostAddToCart: async (dto: AddToCartIV1Post) => {
        const url = '/v1/user-me-order/add-to-cart';
        const res = await http.post<Order>(url, dto);
        return res.data;
    },
    v1PostApplyDiscount: async (dto: ApplyDiscountIV1Post) => {
        const url = '/v1/user-me-order/apply-discount';
        const res = await http.post<Order>(url, dto);
        return res.data;
    },
    v1RemoveDiscount: async () => {
        const url = '/v1/user-me-order/remove-discount';
        const res = await http.post<Order>(url);
        return res.data;
    },
    v1PostClearCart: async () => {
        const url = '/v1/user-me-order/clear-cart';
        const res = await http.post<Order>(url);
        return res.data;
    },
    v1PostCheckout: async (dto: IV1Checkout) => {
        const url = '/v1/user-me-order/checkout';
        const res = await http.post<Order>(url, dto);
        return res.data;
    },
    v1PostMakeOrder: async (dto: IV1MakeOrder) => {
        const url = '/v1/user-me-order/make-order';
        const res = await http.post<Order>(url, dto);
        return res.data;
    },
    v1GetPrice: async () => {
        const url = `/v1/user-me-order/cart-price`;
        const res = await http.get<Order>(url);
        return res.data;
    },
};
