import { QuizEditor } from '../components/QuizEditor';
import { QuizVisualization } from '../components/QuizVisualization';

export const QuizPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/2 h-full">
        quizPage
        <QuizEditor></QuizEditor>
      </div>
      <div className="w-1/2 h-full">
        <QuizVisualization></QuizVisualization>
      </div>
    </div>
  );
};


