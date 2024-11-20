export interface FeedbackAnonymous {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    phone: string;
    email: string;
    subject: string;
    description: string;
    note: string;
    imageUrls: string[];
    status: string;
}
