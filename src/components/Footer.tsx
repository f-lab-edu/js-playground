import { useQuizResultStore, useQuizStore } from '@/store/useQuiz';

export const Footer = () => {
  const { userCode, runCode } = useQuizResultStore();
  const { currentQuiz } = useQuizStore();
  const handleRunCode = () => {
    runCode(userCode);
  };

  return (
    <footer className="bg-gray-950 h-[64px] p-4 flex justify-between items-center">
      <div className="group">
        <span className="text-yellow-950 cursor-pointer">힌트</span>
        <span className=" text-white ml-10 opacity-0 translate-y-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {currentQuiz.hint}
        </span>
      </div>
      <button
        onClick={handleRunCode}
        className="bg-yellow-950 text-gray-950 rounded px-4 py-1 s"
      >
        RUN
      </button>
    </footer>
  );
};
