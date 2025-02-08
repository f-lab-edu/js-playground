import { useEffect } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuizStore } from '../store/useQuiz';
import { HomeHeader } from './HomeHeader';

export const Header = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { currentQuiz, loading, error, fetchQuizData } = useQuizStore();

  useEffect(() => {
    if (location.pathname === '/' || !quizId) return;
    fetchQuizData(quizId);
  }, [quizId]);

  const handlePrevious = () => {
    navigate(`/quizzes/${currentQuiz.prevId}`);
  };
  const handleNext = () => {
    navigate(`/quizzes/${currentQuiz.nextId}`);
  };

  return (
    <header className="bg-gray-950 relative flex h-[64px] items-center p-3">
      <div className="text-yellow-950 font-bold absolute left-4 text-xl">
        <p>Javascript Playground</p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {location.pathname === '/' ? (
          <HomeHeader />
        ) : (
          <>
            <button onClick={handlePrevious} disabled={!currentQuiz.prevId}>
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
            <button onClick={handleNext} disabled={!currentQuiz.nextId}>
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
