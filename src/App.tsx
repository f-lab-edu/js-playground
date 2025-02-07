import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './page/Home';
import { QuizPage } from './page/QuizPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
      </Route>

      <Route path="/quizzes" element={<Layout />}>
        <Route path=":quizId" element={<QuizPage />} />
      </Route>
    </Routes>
  );
}
