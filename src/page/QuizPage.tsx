import { Quiz } from '../components/Quiz';
import { QuizEditor } from '../components/QuizEditor';
import { QuizVisualization } from '../components/QuizVisualization';

export const QuizPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/2 mt-2 ml-2 mr-1 ">
        <Quiz />
        <QuizEditor />
      </div>
      <div className="w-1/2 mt-2 ml-1">
        <QuizVisualization />
      </div>
    </div>
  );
};
