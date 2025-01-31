import CodeMirror, { lineNumbers, oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState } from 'react';
import { useQuizResultStore, useQuizStore, QuizType } from '@/store/useQuiz';

export const QuizEditor = () => {
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { setUserAnswer } = useQuizResultStore()
  const { currentQuiz } = useQuizStore()
  const [value, setValue] = useState(`function solution(){

  }`);
  const executeCode = (code: string, currentQuiz: QuizType) => {
    try {
      let executedList: string[] = []
      currentQuiz.commands.forEach((cmd) => {
        (window as any)[cmd.name] = () => {
          executedList.push(cmd.name);
          return cmd.function();
        };
      });
      const result = new Function(
        `
          "use strict";
          ${code}
          solution()
        `
      )();
      return executedList.length > 0 ? executedList : "아웃풋 없음";
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  const runCode = () => {
    try {
      setError(null);
      const result = executeCode(value, currentQuiz);
      if (result === undefined) {
        setOutput("아웃풋 없음");
      } else {
        setOutput(String(result));
        setUserAnswer(result)
      }
    } catch (err: any) {
      setError(err.message);
      setOutput(null);
    }
  };
  const handleCodeChange = (val: string) => {
    setValue(val);
  };

  return (
    <div>
      <CodeMirror
        className='mt-1'
        value={value}
        theme={oneDark}
        height="500px"
        extensions={[javascript({ jsx: true }), lineNumbers()]}
        onChange={handleCodeChange} />
      <div>
        <button onClick={runCode} className='p-2 bg-yellow-950 rounded'>코드실행</button>
      </div>
      <div>
        <h3>output:</h3>
        {error ? (<p>Error: {error}</p>)
          : (
            <p>{output}</p>
          )}
      </div>
    </div>
  )
};
