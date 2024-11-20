import { Product } from './product';

export interface ProductVariant {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrls: string[];
    product: Product;
    isAllowBuyExceedQuantity: boolean;
}
