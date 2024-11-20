export interface ProductReview {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    email: string;
    rate: number;
    isApproved: boolean;
    content: string;
    imageUrls: string[];
}
