import { Quiz } from '../components/Quiz';
import { QuizEditor } from '../components/QuizEditor';
import { QuizVisualization } from '../components/QuizVisualization';

export const QuizPage = () => {
  return (
    <div className="flex flex-1 h-full">
      <div className="w-1/2 mt-2 ml-2 mr-1 mb-2">
        <Quiz />
        <QuizEditor />
      </div>
      <div className="w-1/2 mt-2 ml-1 mr-2 mb-2">
        <QuizVisualization />
      </div>
    </div>
  );
};
