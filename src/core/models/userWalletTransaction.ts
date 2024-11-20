export interface UserWalletTransaction {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    type: string;
    amount: number;
    status: string;
    checkoutUrl: string;
    deepLink: string;
    qrCode: string;
    expiredAt: string;
    metadata: string;
}
