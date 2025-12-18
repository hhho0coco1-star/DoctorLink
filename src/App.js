import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './myPage/MyPage';
import MainPage from './mainPage/MainPage';
import MainHeader from './mainHeader/MainHeader';
import Login from './logIn/Login';
import FindId from './logIn/FindId';
import FindPassword from './logIn/FindPassword';
import Signup from './logIn/Signup';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />}/>
        <Route path="/find-password" element={<FindPassword />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
