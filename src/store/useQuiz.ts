import { create } from 'zustand';
export interface QuizType {
  id: string;
  title: string;
  description: string;
  codeTemplate: string;
  answer: string;
  hint: string;
  grid: number[][];
  startPosition: { x: number; y: number };
  commands: { name: string; function: () => void }[];
}
interface QuizState {
  currentQuiz: QuizType;
  fetchQuizData: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}
interface QuizResultState {
  userAnswer: string[] | string;
  setUserAnswer: (answer: string[] | string) => void;
  userCode: string;
  setUserCode: (code: string) => void;
  runCode: (code: string) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuiz: {} as QuizType,
  loading: false,
  error: null,
  fetchQuizData: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // 실제 통신시 주석 코드로 바꿀것.
      const response = await fetch(`http://localhost:5001/api/quizzes/${id}`);
      if (!response.ok) {
        throw new Error(`서버응답 오류 ${response.status}`);
      }
      const data = await response.json();
      // const data = quizData.find((quiz) => id === quiz.id);
      console.log(data);
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
  userAnswer: '',
  setUserAnswer: (answer) => set({ userAnswer: answer }),
  userCode: '',
  setUserCode: (code) => set({ userCode: code }),
  runCode: (code) => {
    const currentQuiz = useQuizStore.getState().currentQuiz;
    let executedList: string[] = [];
    currentQuiz.commands.forEach((cmd) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)[cmd.name] = () => {
        executedList.push(cmd.name);
        return cmd.function();
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
      userAnswer: executedList.length > 0 ? executedList : '아웃풋이없어',
    });
  },
}));
