import React from 'react';
import QuizEditor from '../components/QuizEditor';
import QuizVisualization from '../components/QuizVisualization';

const QuizPage = () => {
  return (
    <div className="flex flex-1">
      <div className="w-1/2">
        <QuizEditor></QuizEditor>
      </div>
      <div className="w-1/2">
        <QuizVisualization></QuizVisualization>
      </div>
    </div>
  );
};

export default QuizPage;
