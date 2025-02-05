import { API_BASE_URL } from '@/config/constant';
import { create } from 'zustand';
export interface QuizType {
  id: string;
  title: string;
  description: string;
  grid: number[][];
  hint: string;
  startPosition: { x: number; y: number };
  goalPosition: { x: number; y: number };
  goalAction: string;
  commands: { name: string; functionCode: string }[];
}
interface QuizState {
  currentQuiz: QuizType;
  fetchQuizData: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}
interface QuizResultState {
  userAnswer: string[];
  setUserAnswer: (answer: string[]) => void;
  userCode: string;
  setUserCode: (code: string) => void;
  runCode: (code: string) => void;
}
declare global {
  interface Window {
    [key: string]: () => void;
  }
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: {} as QuizType,
  loading: false,
  error: null,
  fetchQuizData: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      if (!response.ok) {
        throw new Error(`서버응답 오류 ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        set({ currentQuiz: data.data });
      } else {
        set({ error: '퀴즈가없수' });
      }
    } catch (error) {
      set({ error: '퀴즈 데이터 통신 에러 발생' });
    } finally {
      set({ loading: false });
    }
  },
}));

export const useQuizResultStore = create<QuizResultState>((set) => ({
  userAnswer: [],
  setUserAnswer: (answer) => set({ userAnswer: answer }),
  userCode: '',
  setUserCode: (code) => set({ userCode: code }),
  runCode: (code) => {
    const currentQuiz = useQuizStore.getState().currentQuiz;
    let executedList: string[] = [];
    currentQuiz.commands.forEach((cmd) => {
      window[cmd.name] = () => {
        executedList.push(cmd.name);
        new Function(cmd.functionCode)();
      };
    });

    new Function(
      `
          "use strict";
          ${code}
          solution()
        `
    )();

    set({
      userAnswer: executedList.length > 0 ? executedList : ['아웃풋이없어'],
    });
    return executedList;
  },
}));
