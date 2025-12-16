import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import './App.css';
import MainHeader from './header/MainHeader';
import MainPage from './header/MainPage';
import Calendar from './header/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

