import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPages from "./pages/MyPages";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import './App.css';
import MainPage from './header/MainPage';
import Calendar from './header/Calendar';
<<<<<<< HEAD
import DashBoard from "./pages/DashBoard";
import PatientDetail from "./pages/PatientDetail";
=======
import CalendarOverview from "./pages/CalendarOverview";
import Settings from "./pages/Settings";
import Community from "./pages/Community";

>>>>>>> 953e593efba7bc77ea74678e13b8d02d58e992bf

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
<<<<<<< HEAD
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
=======
        <Route path="/calendar" element={<CalendarOverview />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/community" element={<Community />} />
>>>>>>> 953e593efba7bc77ea74678e13b8d02d58e992bf

      </Routes>
    </BrowserRouter>
  );
}

export default App;

