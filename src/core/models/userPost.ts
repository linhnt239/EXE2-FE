import { User } from './user';
import { UserPostComment } from './userPostComment';
import { UserPostLike } from './userPostLike';

export interface UserPost {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: boolean;
    docStatus: number;
    content: string;
    tag: string;
    title: string;
    user: User;
    userPostLikes: UserPostLike[];
    userPostComments: UserPostComment[];
}
