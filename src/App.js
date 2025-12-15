import logo from './logo.svg';
import './App.css';
import MainHeader from './header/MainHeader';
import MainPage from './header/MainPage';
import MyPage from './header/MyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from './header/Calendar';

function App() {
  return (
    // <MainHeader />
    // <MainPage />
    <BrowserRouter>

            {/* 5. Routes로 경로-컴포넌트 매핑을 정의합니다. */}
            <Routes>  
                <Route path="/" element={<MainPage />} /> {/* 메인 페이지 (경로: /) */}
                <Route path="/myPage" element={<MyPage />} /> {/* 마이 페이지 (경로: /myPage) */}
                <Route path="/calendar" element={<Calendar />} />
                
                {/* 필요한 경우 다른 Route를 추가합니다. */}
            </Routes>
        </BrowserRouter>
  );
}

export default App;
