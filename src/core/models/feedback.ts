import { FeedbackQuestion } from './feedbackQuestion';
import { UserFeedback } from './userFeedback';

export interface Feedback {
    code: string;
    name: string;
    isActive: boolean;
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    description: string;
    feedbackQuestions: FeedbackQuestion[];
    userFeedbacks: UserFeedback[];
}
