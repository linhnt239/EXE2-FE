import { ProductVariant } from './productVariant';

export interface OrderItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    quantity: number;
    price: number;
    productVariant: ProductVariant;
}
