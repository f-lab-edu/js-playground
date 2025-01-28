import { create } from 'zustand';

interface QuizType {
  id: number;
  title: string;
  description: string;
  codeTemplate: string;
  answer: string;
  hint: string;
  grid: number[][];
  startPosition: { x: number; y: number };
  commands?: { name: string; animation: string }[];
}

interface QuizState {
  currentQuiz: QuizType | null;
  fetchQuizData: (id: number) => Promise<void>;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: null,
  fetchQuizData: async (id: number) => {
    const response = await fetch(`/api/quizzes/${id}`);
    const data: QuizType = await response.json();
    set({ currentQuiz: data });
  },
}));
