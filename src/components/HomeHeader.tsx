
interface HomeHeaderProps {
  handleStartQuiz: () => void;
}

export const HomeHeader = ({ handleStartQuiz }: HomeHeaderProps) => {
  return (
    <button onClick={handleStartQuiz} className="text-white">
      start Quiz
    </button>
  )
}
