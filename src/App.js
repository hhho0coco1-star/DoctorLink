import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './addressTest/MyPage';
import DashBoard from './/mainPage/DL04_DashBoard';
import MainHeader from './mainHeader/MainHeader';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 미연결 */}
        {/* <Route path='/mypagetest' element={<Mypage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
