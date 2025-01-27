import { QuizEditor } from '../components/QuizEditor';
import { QuizVisualization } from '../components/QuizVisualization';
import { Quiz } from '../components/Quiz';
export const QuizPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/2 m-2">
        <Quiz></Quiz>
        <QuizEditor></QuizEditor>
      </div>
      <div className="w-1/2">
        <QuizVisualization></QuizVisualization>
      </div>
    </div>
  );
};


