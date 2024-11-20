import { BookingOrder } from './bookingOrder';
import { User } from './user';

export interface Booking {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    imageUrl: string;
    description: string;
    status: string;
    user: User;
    bookingOrders: BookingOrder[];
}
