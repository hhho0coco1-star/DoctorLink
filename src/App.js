import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './addressTest/MyPage';
import Calendar from './addressTest/Calendar';
import DashBoard from './/mainPage/DL04_DashBoard';
import MainHeader from './mainHeader/MainHeader';
import HealthQ from './healthQ/HealthQ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/healthq' element={<HealthQ/>} />

        {/* 미연결 */}
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
