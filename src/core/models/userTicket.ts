import { User } from './user';
import { UserTicketMessage } from './userTicketMessage';

export interface UserTicket {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    user: User;
    userTicketMessages: UserTicketMessage[];
}
