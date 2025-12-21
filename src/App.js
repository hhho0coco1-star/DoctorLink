import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import StartPage from './startPage/StartPage';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<DashBoard />} />
    //     <Route path="/mypage" element={<MyPage />} />

    //     <Route path="/calendar" element={<Calendar />} />
    //   </Routes>
    // </BrowserRouter>
    <StartPage />
  );
}

export default App;
