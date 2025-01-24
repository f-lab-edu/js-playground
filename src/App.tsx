import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import QuizPage from './page/QuizPage';
import Home from './page/Home';

function App() {
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

export default App;
