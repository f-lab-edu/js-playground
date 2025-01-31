import { useQuizResultStore, useQuizStore } from "@/store/useQuiz";
import { useEffect, useState } from "react";

export const QuizVisualization = () => {
  const { currentQuiz } = useQuizStore()
  const { startPosition = { x: 0, y: 0 }, grid = [] } = currentQuiz
  const [characterPos, setCharacterPos] = useState(startPosition)
  const { userAnswer } = useQuizResultStore()

  useEffect(() => {
    if (!userAnswer || !Array.isArray(userAnswer) || userAnswer.length === 0) return;
    let newPos = { ...startPosition };
    userAnswer.map((command, index) => {
      setTimeout(() => {
        if (command === "forward") {
          newPos.y = Math.min(newPos.y + 1, grid.length - 1);
        } else if (command === "shoot") {
          console.log("🔫 Shooting!");
        }
        setCharacterPos({ ...newPos });
      }, index * 1000);
    });
  }, [userAnswer]);

  return (
    <div className="bg-gray-950 h-full flex justify-center items-center">
      <div className="grid grid-cols-4 gap-0.5 w-50 h-50 border">
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            let content = null;
            if (rowIndex === characterPos.y && colIndex === characterPos.x) {
              content = "🧍";
            } else if (col === 2) {
              content = "🎯";
            }
            return (
              <div key={`${rowIndex}-${colIndex}`} className="w-20 h-20 border flex items-center justify-center bg-navy-950">
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
