import CodeMirror, { lineNumbers, oneDark } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState } from 'react';

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

export const QuizEditor = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const runCode = () => {
    try {
      setError(null);
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
        height="200px"
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

