import { User } from './user';
import { UserSaleBooking } from './userSaleBooking';

export interface UserSaleBookingOrder {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: boolean;
    docStatus: number;
    description: string;
    price: number;
    extraFee: number;
    note: string;
    clientNote: string;
    startDate: string;
    endDate: string;
    userSaleBooking: UserSaleBooking;
    user: User;
    status: string;
    sourceCode: string;
}
