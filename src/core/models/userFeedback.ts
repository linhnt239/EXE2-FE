import { User } from './user';

export interface UserFeedback {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    point: number;
    takeDate: Date;
    user: User;
}
