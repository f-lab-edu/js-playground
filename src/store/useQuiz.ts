import { API_BASE_URL } from '@/config/constant';
import { create } from 'zustand';
export interface QuizType {
  id: string;
  title: string;
  description: string;
  order: number;
  grid: number[][];
  hint: string;
  startPosition: { x: number; y: number };
  goalPosition: { x: number; y: number };
  goalAction: string;
  commands: { name: string; functionCode: string }[];
}
interface QuizState {
  currentQuiz: QuizType;
  prevQuiz: QuizType;
  nextQuiz: QuizType;
  fetchQuizData: (id: string) => Promise<void>;
  fetchFirstQuizData: () => Promise<void>;
  loading: boolean;
  error: string | null;
  setQuizState: (newState: Partial<QuizState>) => void;
}
interface QuizResultState {
  userAnswer: string[];
  setUserAnswer: (answer: string[]) => void;
  userCode: string;
  setUserCode: (code: string) => void;
  addSidebarCommand: (code: string) => void;
  runCode: (code: string) => void;
}
interface CommandObject {
  [key: string]: () => void;
}
export interface QuizListState {
  id: string;
  title: string;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: {} as QuizType,
  prevQuiz: {} as QuizType,
  nextQuiz: {} as QuizType,
  loading: false,
  error: null,
  setQuizState: (newState) => set((state) => ({ ...state, ...newState })),
  fetchFirstQuizData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/firstQuiz`);
      if (!response.ok) {
        throw new Error(`서버응답 오류 ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        set({
          currentQuiz: data,
        });
        return data.id;
      } else {
        set({ error: '퀴즈리스트가없음' });
        return null;
      }
    } catch (error) {
      set({ error: '퀴즈리스트 데이터 통신 에러 발생' });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  fetchQuizData: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      if (!response.ok) {
        throw new Error(`서버응답 오류 ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        set({
          currentQuiz: data.currentQuiz,
          prevQuiz: data.prevQuiz,
          nextQuiz: data.nextQuiz,
        });
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
  addSidebarCommand: (code: string) => {
    set((state) => ({
      userCode: state.userCode + '\n' + code + `()`,
    }));
  },
  runCode: (code) => {
    const currentQuiz = useQuizStore.getState().currentQuiz;
    const executedList: string[] = [];
    const commandsForSolution = currentQuiz.commands.reduce(
      (acc: CommandObject, cur) => {
        acc[cur.name] = () => {
          executedList.push(cur.name);
          new Function(cur.functionCode)();
        };
        return acc;
      },
      {}
    );

    new Function(
      `
          "use strict";
          const{${Object.keys(commandsForSolution).join(', ')}} = arguments[0]
          ${code}
          solution()
        `
    )(commandsForSolution);

    set({
      userAnswer: executedList.length > 0 ? executedList : ['아웃풋이없어'],
    });
    return executedList;
  },
}));
