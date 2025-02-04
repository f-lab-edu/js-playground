import { useQuizResultStore, useQuizStore } from '@/store/useQuiz';
import { useEffect, useState } from 'react';

export const QuizVisualization = () => {
  const { currentQuiz } = useQuizStore();
  const { startPosition, grid, goalPosition } = currentQuiz;
  const [characterPos, setCharacterPos] = useState(
    startPosition || { x: 0, y: 0 }
  );
  const { userAnswer } = useQuizResultStore();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userAnswer || !Array.isArray(userAnswer) || userAnswer.length === 0)
      return;
    const newPos = { ...startPosition };
    let userAction = false;
    userAnswer.map((command, index) => {
      setTimeout(() => {
        if (command === 'forward') {
          newPos.y = Math.min(newPos.y + 1, grid.length - 1);
        } else if (command === 'shoot') {
          console.log('🔫 Shooting!');
          userAction = true;
        }
        setCharacterPos({ ...newPos });

        console.log(
          `현재 위치: (${newPos.x}, ${newPos.y}) / 목표 위치: (${goalPosition.x}, ${goalPosition.y})`
        );
        if (index === userAnswer.length - 1) {
          const isCorrectAnswer =
            newPos.x === goalPosition.x &&
            newPos.y === goalPosition.y &&
            userAction;
          console.log(`정답 여부: ${isCorrectAnswer}`);

          setIsCorrect(isCorrectAnswer);
        } else {
          setIsCorrect(false);
        }
      }, index * 1000);
    });
  }, [userAnswer]);

  return (
    <div className="bg-gray-950 h-full flex justify-center items-center flex-col">
      <div className="grid grid-cols-4 gap-0.5 w-50 h-50 border">
        {grid?.map((row, rowIndex) =>
          row?.map((col, colIndex) => {
            let content = null;
            if (rowIndex === characterPos.y && colIndex === characterPos.x) {
              content = '🧍';
            } else if (col === 2) {
              content = '🎯';
            }
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-20 h-20 border flex items-center justify-center bg-navy-950 "
              >
                {content}
              </div>
            );
          })
        )}
      </div>
      {isCorrect === null ? (
        <p className="text-gray-500">코드를 실행해주세요</p>
      ) : isCorrect ? (
        <p className="text-green-500">정답</p>
      ) : (
        <p className="text-red-500">실패</p>
      )}
    </div>
  );
};
