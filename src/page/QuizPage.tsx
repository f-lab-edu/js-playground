import { QuizEditor } from '../components/QuizEditor';
import { QuizVisualization } from '../components/QuizVisualization';
import { Quiz } from '@/components/Quiz';
export const QuizPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/2 m-2">
        <Quiz></Quiz>
      <div className="w-1/2 h-full">
        <QuizEditor></QuizEditor>
      </div>
      <div className="w-1/2 h-full">
        <QuizVisualization></QuizVisualization>
      </div>
    </div>
  );
};


