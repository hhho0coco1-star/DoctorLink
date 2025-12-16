import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/Mypage";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import './App.css';
import MainPage from './header/MainPage';
import Calendar from './header/Calendar';
import CalendarOverview from "./pages/CalendarOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} /> */}
        <Route path="/" element={<CalendarOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

