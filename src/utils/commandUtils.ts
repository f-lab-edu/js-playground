import { CommandObject, QuizType } from '@/store/useQuiz';

export const getCommandForSolution = (
  currentQuiz: QuizType,
  executedList: string[]
): CommandObject => {
  return currentQuiz.commands.reduce((acc: CommandObject, cur) => {
    acc[cur.name] = () => {
      executedList.push(cur.name);
      new Function(cur.functionCode)();
    };
    return acc;
  }, {});
};
