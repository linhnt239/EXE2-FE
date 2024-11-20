import { User } from './user';

export interface UserWallet {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    type: string;
    availableBalance: number;
    pendingBalance: number;
    blockBalance: number;
    user: User;
}
