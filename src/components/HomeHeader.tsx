import { useQuizStore } from '@/store/useQuiz';
import { useNavigate } from 'react-router-dom';

export const HomeHeader = () => {
  const { fetchFirstQuizData } = useQuizStore();
  const navigate = useNavigate();
  const handleStartQuiz = async () => {
    const firstQuizId = await fetchFirstQuizData();
    navigate(`quizzes/${firstQuizId}`);
  };
  return (
    <button onClick={handleStartQuiz} className="text-white">
      start Quiz
    </button>
  );
};
