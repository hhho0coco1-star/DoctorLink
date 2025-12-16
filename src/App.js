import logo from './logo.svg';
import './App.css';
import MyPage from './header/MyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './header/Calendar';
import DashBoard from './header/DL04_DashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/calendar" element={<Calendar />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
