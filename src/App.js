import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";
import Settings from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
      {/* {<MyPage></MyPage>} */}
    </BrowserRouter>

  );
}

export default App;
