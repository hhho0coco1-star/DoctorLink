import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPages from "./pages/MyPages";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import './App.css';
import MainPage from './header/MainPage';
import Calendar from './header/Calendar';
import CalendarOverview from "./pages/CalendarOverview";
import Settings from "./pages/Settings";
import Community from "./pages/Community";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypages" element={<MyPages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/calendar" element={<CalendarOverview />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/community" element={<Community />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

