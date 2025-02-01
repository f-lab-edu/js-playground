import { useQuizResultStore } from '@/store/useQuiz';

export const Footer = () => {
  const { userCode, runCode } = useQuizResultStore();
  const handleRunCode = () => {
    runCode(userCode);
  };

  return (
    <footer className="bg-gray-950 h-[64px] p-4 relative ">
      <span className="text-yellow-950 cursor-pointer">힌트</span>
      <button
        onClick={handleRunCode}
        className="bg-yellow-950 text-gray-950 rounded px-4 py-1 absolute left-1/2 transform -translate-x-1/2 "
      >
        RUN
      </button>
    </footer>
  );
};
