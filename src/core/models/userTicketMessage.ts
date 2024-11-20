export interface UserTicketMessage {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    content: string;
    isResponse: boolean;
    type: string;
}
