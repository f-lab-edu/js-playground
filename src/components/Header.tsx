import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from 'react-icons/fa';
import { quizData } from '../data/data';

interface QuizType {
  id: number;
  title: string;
  description: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [currentQuizId, setCurrentQuizId] = useState<number>(
    parseInt(quizId || '1', 10)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);

  const fetchQuizData = (id: number) => {
    const quiz = quizData.find((q) => q.id == id);
    if (quiz) {
      setCurrentQuiz(quiz);
      setError(null);
    } else {
      setError('오류 퀴즈가 없어용 ');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchQuizData(currentQuizId);
    setLoading(false);
  }, [currentQuizId]);

  const handlePrevious = () => {
    if (currentQuiz && currentQuizId > 1) {
      const previousQuizId = currentQuizId - 1;
      setCurrentQuizId(previousQuizId);
      navigate(`/quizzes/${previousQuizId}`);
    }
  };
  const handleNext = () => {
    if (currentQuiz) {
      const nextQuizId = currentQuizId + 1;
      setCurrentQuizId(nextQuizId);
      navigate(`/quizzes/${nextQuizId}`);
    }
  };
  const handleStartQuiz = () => {
    navigate('/quizzes/1');
  };

  return (
    <header className="bg-customGray relative flex h-[60px] items-center p-3">
      <div className="text-customYellow font-bold absolute left-4 text-xl">
        <p>Javascript Playground</p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {location.pathname === '/' ? (
          <button onClick={handleStartQuiz} className="text-white">
            start Quiz
          </button>
        ) : (
          <>
            <button
              onClick={handlePrevious}
              disabled={!currentQuizId || currentQuizId <= 1}
            >
              <FaRegArrowAltCircleLeft
                className="cursor-pointer text-customYellow"
                size={24}
              ></FaRegArrowAltCircleLeft>
            </button>
            {loading ? (
              <p>로딩 중입니다...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-white">{currentQuiz?.title}</p>
            )}
            <button onClick={handleNext} disabled={!currentQuizId}>
              <FaRegArrowAltCircleRight
                className="cursor-pointer text-customYellow"
                size={24}
              ></FaRegArrowAltCircleRight>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
