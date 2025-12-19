import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './myPage/MyPage';
import MainPage from './mainPage/MainPage';
// import MainHeader from './mainHeader/MainHeader';
import Login from './logIn/Login';
import FindId from './logIn/FindId';
import FindPassword from './logIn/FindPassword';
import Signup from './logIn/Signup';

// 
import Calendar from './calendarOverview/CalendarOverview';
import Settings from "./settings/Settings";
import HospitalSearchPage from "./hospital/HospitalSearchPage"
import HospitalDetail from "./hospital/HospitalDetail";
import DashBoard from "./doctorDashBoard/DoctorDashBoard";
import PatientDetail from "./patientDetail/PatientDetail";
import Community from './community/Community';

// test
// import CalendarOverviewTest from './calendarOverview/CalendarOverviewTest';


export default function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainPage />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />

        {/*  */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hospitalSearch" element={<HospitalSearchPage />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='/community' element={<Community />} />

        {/* test */}
        {/* <Route path='/calendartest' element={<CalendarOverviewTest />} /> */}

      </Routes>
    </BrowserRouter>

  )
}
