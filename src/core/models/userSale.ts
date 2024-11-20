import { ProductCategory } from './productCategory';
import { User } from './user';

export interface UserSale {
    name: string;
    description: string;
    price: number;
    imageUrls: string[];
    createdBy: User;
    productCategory: ProductCategory;
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    note: string;
    status: string;
}
