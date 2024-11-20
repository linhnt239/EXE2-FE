export interface Advertising {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    description: string;
    slug: string;
    group: string;
    default: string;
    contents: string[];
    cycleTime: number;
    type: string;
}
