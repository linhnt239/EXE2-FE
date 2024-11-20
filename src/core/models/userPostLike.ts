import { User } from './user';

export interface UserPostLike {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    react: number;
    user: User;
}
