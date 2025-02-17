import { useQuizResultStore, useQuizStore } from '@/store/useQuiz';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FORWARD, JUMP, SHOOT, TURN_RIGHT } from '../config/constant';
export const QuizVisualization = () => {
  const { currentQuiz } = useQuizStore();
  const { startPosition = { x: 0, y: 0 }, grid, goalPosition } = currentQuiz;
  const [characterPos, setCharacterPos] = useState(startPosition);
  const { userAnswer } = useQuizResultStore();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { quizId } = useParams();
  const directionRef = useRef<'x' | 'y'>('y');

  useEffect(() => {
    if (!userAnswer || !Array.isArray(userAnswer) || userAnswer.length === 0)
      return;

    const newPos = { ...startPosition };
    let userAction = false;

    userAnswer.map((command, index) => {
      setTimeout(() => {
        let nextX = newPos.x;
        let nextY = newPos.y;

        if (directionRef.current === 'y') {
          if (command === FORWARD) {
            if (grid[newPos.y + 1]?.[newPos.x] !== 1) {
              nextY = Math.min(newPos.y + 1, grid.length - 1);
            } else {
              alert('🚧 장애물 발견! 회피 필요');
            }
          } else if (command === SHOOT) {
            console.log('🔫 Shooting!');
            userAction = true;
          } else if (command === TURN_RIGHT) {
            directionRef.current = 'x';
          } else if (command === JUMP) {
            nextY = Math.min(newPos.y + 2, grid.length - 1);
          }
        } else if (directionRef.current === 'x') {
          if (command === FORWARD) {
            if (grid[newPos.y]?.[newPos.x + 1] !== 1) {
              nextX = Math.min(newPos.x + 1, grid.length - 1);
            } else {
              alert('🚧 장애물 발견! 회피 필요');
            }
          } else if (command === SHOOT) {
            console.log('🔫 Shooting!');
            userAction = true;
          } else if (command === TURN_RIGHT) {
            directionRef.current = 'y';
          } else if (command === JUMP) {
            nextY = Math.min(newPos.x + 2, grid.length - 1);
          }
        }

        newPos.x = nextX;
        newPos.y = nextY;
        setCharacterPos({ ...newPos });

        console.log(
          `현재 위치: (${newPos.x}, ${newPos.y}) / 목표 위치: (${goalPosition.x}, ${goalPosition.y})`
        );

        if (index === userAnswer.length - 1) {
          const isCorrectAnswer =
            newPos.x === goalPosition.x &&
            newPos.y === goalPosition.y &&
            userAction;
          setIsCorrect(isCorrectAnswer);
          directionRef.current = 'y';
        }
      }, index * 1000);
    });
  }, [userAnswer]);

  useEffect(() => {
    setCharacterPos(startPosition);
    setIsCorrect(null);
  }, [quizId]);

  return (
    <div className="bg-gray-950 h-full flex justify-center items-center flex-col">
      <div className="grid grid-cols-4 gap-0.5 w-50 h-50 border">
        {grid?.map((row, rowIndex) =>
          row?.map((col, colIndex) => {
            let content = null;
            let border = null;
            if (rowIndex === characterPos.y && colIndex === characterPos.x) {
              content = '🧍';
            } else if (col === 2) {
              content = '🎯';
            } else if (col === 1) {
              border = '🚧';
            }
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-20 h-20 border flex items-center justify-center bg-navy-950 "
              >
                {content}
                {border}
              </div>
            );
          })
        )}
      </div>
      {isCorrect === null ? (
        <p className="text-gray-500 mt-4">코드를 실행해주세요</p>
      ) : isCorrect ? (
        <p className="text-green-500 mt-4">정답</p>
      ) : (
        <p className="text-red-500 mt-4">실패</p>
      )}
    </div>
  );
};
