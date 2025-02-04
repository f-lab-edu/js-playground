import { useEffect } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuizStore } from '../store/useQuiz';
import { HomeHeader } from './HomeHeader';

const FIRST_QUIZ_ID = 1;

export const Header = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { currentQuiz, loading, error, fetchQuizData } = useQuizStore();

  useEffect(() => {
    if (location.pathname === '/') return;
    const parsedQuizId = parseInt(quizId || '', 10);
    if (isNaN(parsedQuizId) || parsedQuizId < FIRST_QUIZ_ID) {
      navigate(`/quizzes/${FIRST_QUIZ_ID}`, { replace: true });
      fetchQuizData(FIRST_QUIZ_ID.toString());
    }
    fetchQuizData(parsedQuizId.toString());
  }, [quizId]);

  const handlePrevious = () => {
    const parsedQuizId = parseInt(quizId || '', 10);
    if (currentQuiz && parsedQuizId > FIRST_QUIZ_ID) {
      const previousQuizId = parsedQuizId - 1;
      navigate(`/quizzes/${previousQuizId}`);
    }
  };
  const handleNext = () => {
    const parsedQuizId = parseInt(quizId || '', 10);
    if (currentQuiz) {
      const nextQuizId = parsedQuizId + 1;
      navigate(`/quizzes/${nextQuizId}`);
    }
  };
  const handleStartQuiz = () => {
    navigate(`/quizzes/${FIRST_QUIZ_ID}`);
  };

  return (
    <header className="bg-gray-950 relative flex h-[64px] items-center p-3">
      <div className="text-yellow-950 font-bold absolute left-4 text-xl">
        <p>Javascript Playground</p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {location.pathname === '/' ? (
          <HomeHeader handleStartQuiz={handleStartQuiz} />
        ) : (
          <>
            <button
              onClick={handlePrevious}
              disabled={!quizId || parseInt(quizId) <= FIRST_QUIZ_ID}
            >
              <FaRegArrowAltCircleLeft
                className="cursor-pointer text-yellow-950"
                size={24}
              />
            </button>
            {loading ? (
              <p>로딩 중입니다...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-white">{currentQuiz.title || '퀴즈없음'}</p>
            )}
            <button onClick={handleNext} disabled={!quizId}>
              <FaRegArrowAltCircleRight
                className="cursor-pointer text-yellow-950"
                size={24}
              />
            </button>
          </>
        )}
      </div>
    </header>
  );
};
