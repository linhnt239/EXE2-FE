import { MusicAuthor } from './musicAuthor';
import { MusicCategory } from './musicCategory';

export interface Music {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    description: string;
    thumbnail: string;
    point: number;
    link: string;
    musicCategory: MusicCategory;
    musicAuthor: MusicAuthor;
}
