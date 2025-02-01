import { useQuizResultStore } from '@/store/useQuiz';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror, { lineNumbers, oneDark } from '@uiw/react-codemirror';
import { useState } from 'react';

export const QuizEditor = () => {
  const { setUserCode } = useQuizResultStore();
  const [value] = useState(`function solution(){
  
}`);
  const handleCodeChange = (code: string) => {
    setUserCode(code);
  };

  return (
    <div>
      <CodeMirror
        className="mt-1"
        value={value}
        theme={oneDark}
        height="500px"
        extensions={[javascript({ jsx: true }), lineNumbers()]}
        onChange={handleCodeChange}
      />
    </div>
  );
};
