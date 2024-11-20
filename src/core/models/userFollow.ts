import { User } from './user';

export interface UserFollow {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    user: User;
    createdBy: User;
}
