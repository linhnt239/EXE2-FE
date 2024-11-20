import { User } from './user';

export interface UserReview {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    rate: number;
    content: string;
    imageUrls: string[];
    user: User;
    createdBy: User;
}
