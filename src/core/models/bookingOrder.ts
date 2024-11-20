import { User } from './user';

export enum BookingOrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PAID = 'PAID',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface BookingOrder {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    description: string;
    price: number;
    startTime: string;
    endTime: string;
    status: string;
    user: User;
    meetingUrl: string;
}
