import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { quizData } from '../data/data';
import { HomeHeader } from './HomeHeader';

interface QuizType {
  id: number;
  title: string;
  description: string;
}

export const Header = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const FIRST_QUIZ_ID = 1;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);


  const fetchQuizData = async (id: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const quiz = quizData.find((q) => q.id == id);
        if (quiz) {
          setCurrentQuiz(quiz)
          setError(null)
          resolve(quiz)
        } else {
          setError('오류 퀴즈가 없어용');
          reject(new Error('퀴즈를 찾을 수 없습니다.'));
        }
      }, 0)
    })
  };

  useEffect(() => {
    if (location.pathname === "/") return;
    const parsedQuizId = parseInt(quizId || '', 10);
    if (isNaN(parsedQuizId) || parsedQuizId < FIRST_QUIZ_ID) {
      navigate(`/quizzes/${FIRST_QUIZ_ID}`, { replace: true })
    }
    const loadingQuiz = async () => {
      setLoading(true)
      try {
        await fetchQuizData(parsedQuizId)
      } catch {
        console.error("퀴즈 데이터 통신 에러 발생", error)
      } finally {
        setLoading(false)
      }
    }

    loadingQuiz()
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
    <header className="bg-gray-950 relative flex h-[60px] items-center p-3">
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
              <p className="text-white">{currentQuiz?.title}</p>
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


