import { IPagingDto, ResponseList } from '../models/common';
import { ProductCategory } from '../models/productCategory';
import { ProductReview } from '../models/productReview';
import http from './http';

export interface ApproveProductReviewDto extends Pick<ProductReview, 'isApproved'> {}

export const productReviewApi = {
    v1PutApprove: async (id: string, dto: ApproveProductReviewDto) => {
        const url = `/v1/product-review/approve/${id}`;
        const res = await http.put<ProductReview>(url, dto);
        return res.data;
    },
};
