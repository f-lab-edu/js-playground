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
  currentQuiz: QuizType;
  fetchQuizData: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: {} as QuizType,
  loading: false,
  error: null,
  fetchQuizData: async (id: number) => {
    set({ loading: true, error: null });
    try {
      // 실제 통신시 주석 코드로 바꿀것.
      // const response = await fetch(`/api/quizzes/${id}`);
      // const data: QuizType = await response.json();
      const data = quizData.find((quiz) => id === quiz.id);
      if (data) {
        set({ currentQuiz: data, loading: false });
      } else {
        set({ error: '퀴즈가없수', loading: false });
      }
    } catch (error) {
      set({ error: '퀴즈 데이터 통신 에러 발생', loading: false });
    }
  },
}));
