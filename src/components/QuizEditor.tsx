import CodeMirror, { lineNumbers, oneDark, ViewUpdate } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useState } from 'react';

export const QuizEditor = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const runCode = useCallback(() => {
    try {
      setError(null);
      const executeCode = (code: string) => {
        try {
          const result = new Function(
            `
              "use strict";
              ${code}
            `
          )();
          return result;
        } catch (err: any) {
          throw new Error(err.message);
        }
      };
      const result = executeCode(value);
      if (result === undefined) {
        setOutput("아웃풋 없음");
      } else {
        setOutput(String(result));
      }
    } catch (err: any) {
      setError(err.message);
      setOutput(null);
    }
  }, [value]);
  const onChange = useCallback((val: string) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <div>
      <CodeMirror
        className='mt-1'
        value={value}
        theme={oneDark}
        height="200px"
        extensions={[javascript({ jsx: true }), lineNumbers()]}
        onChange={onChange} />
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

