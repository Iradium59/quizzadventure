

export interface CategorieProps {
    id: number;
    name: string;
}

export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
}

export interface History {
    id: number;
    user: string;
    score: number;
    answered_question_count: number;
    questions: number;
    state: 'PENDING' | 'ONGOING' | 'ENDING';
    questions_data: Question[];
    createdAt: Date;
    updatedAt: Date;
}


export interface Answer {
    id: number;
    answer: string;
    isCorrect: boolean;
    questionId: number;
}

export interface QuizPageState {
    username: string;
    selectedCategory: number | null;
    numberOfQuestions: number;
}

export interface RecapPageState {
    username: string;
    score: number;
    totalQuestions: number;
}