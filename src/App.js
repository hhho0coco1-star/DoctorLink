import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MyPage from './myPage/MyPage';
import MainPage from './mainPage/MainPage';
import Login from './logIn/Login';
import FindId from './logIn/FindId';
import FindPassword from './logIn/FindPassword';
import Signup from './logIn/Signup';
import { isMobile } from "./utils/isMobile";
import MobileMainPage from './mobilemainpage/MobileMainPage';
import Calendar from './calendarOverview/CalendarOverview';
import Settings from "./settings/Settings";
import HospitalSearchPage from "./hospital/HospitalSearchPage"
import HospitalDetail from "./hospital/HospitalDetail";
import DashBoard from "./doctorDashBoard/DoctorDashBoard";
import PatientDetail from "./patientDetail/PatientDetail";
import Community from './community/Community';

<<<<<<< HEAD
import StartPage from './startPage/StartPage';
=======
function MainPageWrapper() {
  if (isMobile()) {
    return <MobileMainPage />;
  }
  return <MainPage />;
}
>>>>>>> 45b624d37397aea9cab14dc2fe3d8349be933169


export default function App() {
  return (

<<<<<<< HEAD
    // <BrowserRouter>
    //   <Routes>

    //     <Route path="/" element={<MainPage />} />

    //     {/* 로그인 */}
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/find-id" element={<FindId />} />
    //     <Route path="/find-password" element={<FindPassword />} />
    //     <Route path="/mypage" element={<MyPage />} />
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/mypage" element={<MyPage />} />
>>>>>>> 45b624d37397aea9cab14dc2fe3d8349be933169

    //     {/*  */}
    //     <Route path="/calendar" element={<Calendar />} />
    //     <Route path="/settings" element={<Settings />} />
    //     <Route path="/hospitalSearch" element={<HospitalSearchPage />} />
    //     <Route path="/hospital/:id" element={<HospitalDetail />} />
    //     <Route path="/dashboard" element={<DashBoard />} />
    //     <Route path="/patient/:id" element={<PatientDetail />} />
    //     <Route path='/community' element={<Community />} />


    //   </Routes>
    // </BrowserRouter>
    <StartPage />
  )
}
