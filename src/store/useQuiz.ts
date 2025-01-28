import { create } from 'zustand';
import { quizData } from '../data/data';
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
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: null,
  loading: false,
  error: null,
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  fetchQuizData: async (id: number) => {
    // 실제 통신시 주석 코드로 바꿀것.
    // const response = await fetch(`/api/quizzes/${id}`);
    // const data: QuizType = await response.json();
    const data = quizData.find((quiz) => id === quiz.id);
    if (data) {
      set({ currentQuiz: data });
    } else {
      set({ error: '퀴즈가없수' });
    }
  },
}));
