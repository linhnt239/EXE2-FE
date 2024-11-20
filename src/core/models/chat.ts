import { ChatMessage } from './chatMessage';
import { User } from './user';

export interface Chat {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    slug: string;
    isGroup: boolean;
    banner: string;
    status: string;
    lastActivity: string;

    users: User[];
    chatMessages: ChatMessage[];
}
