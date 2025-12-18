import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPages from "./pages/MyPages";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import './App.css';
import MainPage from './header/MainPage';
import Calendar from './header/Calendar';
import DashBoard from "./pages/DashBoard";
import PatientDetail from "./pages/PatientDetail";

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
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/patient/:id" element={<PatientDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

