import { User } from './user';

export interface CommonReview {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    rate: number;
    content: string;
    imageUrls: string[];
    ownerId: string;
    subOwnerId: string;
    createdBy: User;
}
