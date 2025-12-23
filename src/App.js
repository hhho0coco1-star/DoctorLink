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
import DashBoard from './pages/DashBoard';
import PatientDetail from './pages/PatientDetail';
import Community from './community/Community';
import StartPage from './startPage/StartPage';
import HealthPage from './mobilemainpage/HealthPage';
import HistoryPage from './mobilemainpage/HistoryPage';
import ConsultationPage from './mobilemainpage/ConsultationPage';

function MainPageWrapper() {
  if (isMobile()) {
    return <MobileMainPage />;
  }
  return <MainPage />;
}
function StartPageWrapper() {
  if (isMobile()) {
    return <MobileMainPage />;
  }
  return <StartPage />;
}


export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPageWrapper />} />
        <Route path="/mainpage" element={<MainPageWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/mypage" element={<MyPage />} />

        {/*  */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hospitalSearch" element={<HospitalSearchPage />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path='/community' element={<Community />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />


      </Routes>
    </BrowserRouter>
  )
}
