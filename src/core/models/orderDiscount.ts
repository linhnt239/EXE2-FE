import { Dayjs } from 'dayjs';

export interface OrderDiscount {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    code: string;
    isActive: boolean;
    type: string;
    value: number;
    expiredDate: string;
    activeDate: string;
    numberOfUsed: number;
}
