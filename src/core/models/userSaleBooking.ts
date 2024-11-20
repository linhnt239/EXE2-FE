import { ServiceCategory } from './serviceCategory';
import { User } from './user';

export interface UserSaleBooking {
    name: string;
    description: string;
    price: number;
    imageUrls: string[];
    user: User;
    extraFee: number;
    serviceCategory: ServiceCategory;
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    status: string;
    group: string;
}
