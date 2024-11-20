import { User } from './user';

export interface ChatMessage {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    content: string;
    type: string;
    user: User;
}

export interface Language {
    id: string;
    label: string;
    name: string;
    value: string;
    color: string;
    slug: string;
}
