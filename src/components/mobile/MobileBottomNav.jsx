import { Link, useLocation } from "react-router-dom";
import "./MobileBottomNav.css";

export default function MobileBottomNav() {
    const location = useLocation();
    const isLoggedIn = false; // TODO: 로그인 상태 확인

    return (
        <nav className="mobile-bottom-nav">
            <Link 
                to="/" 
                className={`mobile-nav-item ${location.pathname === "/" ? "active" : ""}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>홈</span>
            </Link>

            <Link 
                to="/consultation" 
                className={`mobile-nav-item ${location.pathname === "/consultation" ? "active" : ""}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>문진 작성</span>
            </Link>

            <Link 
                to="/health" 
                className={`mobile-nav-item ${location.pathname === "/health" ? "active" : ""}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>건강관리</span>
            </Link>

            <Link 
                to="/history" 
                className={`mobile-nav-item ${location.pathname === "/history" ? "active" : ""}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>진료내역</span>
            </Link>

            <Link 
                to={isLoggedIn ? "/mypages" : "/login"} 
                className={`mobile-nav-item ${location.pathname === "/mypages" || location.pathname === "/login" ? "active" : ""}`}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{isLoggedIn ? "마이페이지" : "로그인"}</span>
            </Link>
        </nav>
    );
}