import { useQuizResultStore } from '@/store/useQuiz';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror, { lineNumbers, oneDark } from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const QuizEditor = () => {
  const { setUserCode } = useQuizResultStore();
  const { quizId } = useParams();
  const [codeValue, setCodeValue] = useState(`function solution(){
  
}`);
  const handleCodeChange = (code: string) => {
    setUserCode(code);
  };

  useEffect(() => {
    setUserCode('');
    setCodeValue(`function solution(){
  
}`);
  }, [quizId]);

  return (
    <div>
      <CodeMirror
        key={quizId}
        className="mt-2"
        value={codeValue}
        theme={oneDark}
        height="500px"
        extensions={[javascript({ jsx: true }), lineNumbers()]}
        onChange={handleCodeChange}
      />
    </div>
  );
};
