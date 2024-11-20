import { ProductCategory } from './productCategory';
import { ProductReview } from './productReview';
import { ProductVariant } from './productVariant';

export interface Product {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    description: string;
    productCategory: ProductCategory;
    productVariants: ProductVariant[];
    productReviews: ProductReview[];
}
