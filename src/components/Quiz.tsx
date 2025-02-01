import { useQuizStore } from '@/store/useQuiz';

export const Quiz = () => {
  const { currentQuiz } = useQuizStore();

  return (
    <div className="bg-navy-950 p-4 text-white">
      <p>{currentQuiz.description}</p>
    </div>
  );
};
