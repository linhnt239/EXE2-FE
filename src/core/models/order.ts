import { OrderDiscount } from './orderDiscount';
import { OrderItem } from './orderItem';
import { User } from './user';

export interface Order {
    id: string;
    createdAt: string;
    status: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    type: string;
    user: User;
    orderItems: OrderItem[];
    orderDiscount: OrderDiscount;
    address: string;
    phone: string;
    name: string;
    beforeDiscountTotal: number;
    afterDiscountTotal: number;
    discountAmount: number;
    note: string;
    paymentMethod: string;
    extraFee: number;
}
