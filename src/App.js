import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './addressTest/MyPage';
import Calendar from './addressTest/Calendar';
import DashBoard from './/mainPage/DL04_DashBoard';
import MainHeader from './mainHeader/MainHeader';

import StartPage from './startPage/StartPage';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<DashBoard />} />
    //     <Route path="/mypage" element={<MyPage />} />

    //     <Route path="/calendar" element={<Calendar />} />
    //   </Routes>
    // </BrowserRouter>
    <StartPage />
  );
}

export default App;
