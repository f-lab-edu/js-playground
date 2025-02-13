import { API_BASE_URL } from '@/config/constant';
import { alterASICode } from '@/lib/codeASIUtils';
import { validateUserCode } from '@/lib/codeValidateUtils';
import { getCommandForSolution } from '@/lib/commandUtils';
import { create } from 'zustand';
export interface QuizType {
  id: string;
  title: string;
  description: string;
  isFirst: boolean;
  prevId: string | null;
  nextId: string | null;
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
  fetchFirstQuizData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
interface QuizResultState {
  userAnswer: string[];
  userCode: string;
  setUserCode: (code: string) => void;
  runCode: () => void;
}
export interface CommandObject {
  [key: string]: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: {} as QuizType,
  prevQuizId: null,
  nextQuizId: null,
  loading: false,
  error: null,
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
  userCode: `function solution(){
  
}`,
  setUserCode: (code) => set({ userCode: code }),
  runCode: () => {
    const currentQuiz = useQuizStore.getState().currentQuiz;
    const userCode = useQuizResultStore.getState().userCode;
    const executedList: string[] = [];
    const commandsForSolution = getCommandForSolution(
      currentQuiz,
      executedList
    );
    const codeInsideSolution = validateUserCode(userCode);
    const alteredASICode = alterASICode(codeInsideSolution);

    try {
      new Function(
        `"use strict";
          const commands = arguments[0];         
        function solution(){
         const { ${Object.keys(commandsForSolution).join(', ')} } = commands;
          ${alteredASICode}
        }
        solution();
        `
      )(commandsForSolution);
    } catch (error) {
      console.error('코드 실행 오류:', error);
      alert('코드 실행 중 오류가 발생했습니다.');
      return;
    }

    set({
      userAnswer: executedList.length > 0 ? executedList : [],
    });
  },
}));
