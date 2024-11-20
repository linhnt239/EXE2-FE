export interface FeedbackQuestionAnswer {
    answer: string;
    point: number;
    index: number;
}

export interface FeedbackQuestion {
    question: string;
    index: number;
    answers: FeedbackQuestionAnswer[];
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
}
