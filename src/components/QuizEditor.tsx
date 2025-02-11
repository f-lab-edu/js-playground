import { useQuizResultStore } from '@/store/useQuiz';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror, { lineNumbers, oneDark } from '@uiw/react-codemirror';
import { useParams } from 'react-router-dom';

export const QuizEditor = () => {
  const { userCode, setUserCode } = useQuizResultStore();
  const { quizId } = useParams();

  return (
    <div>
      <CodeMirror
        key={quizId}
        className="mt-2"
        value={userCode}
        theme={oneDark}
        height="500px"
        extensions={[javascript({ jsx: true }), lineNumbers()]}
        onChange={setUserCode}
      />
    </div>
  );
};
