import { Link, useNavigate } from "react-router-dom";
import "./MobileMainPage.css";
import MobileBottomNav from "../components/mobile/MobileBottomNav";

const departments = [
    "내과",
    "외과",
    "정형외과",
    "피부과",
    "이비인후과",
    "소아과",
    "산부인과",
    "신경과",
    "정신의학과",
    "안과",
    "치과",
    "한의원",
];

export default function MobileMainPage() {
    const navigate = useNavigate();
    const userName = "홍길동"; // TODO: 실제 사용자 이름 가져오기
    const isLoggedIn = false; // TODO: 로그인 상태 확인

    const handleDepartmentClick = (dept) => {
        // HospitalSearchPage로 이동하면서 진료과 필터 적용
        navigate("/hospitalSearch", { state: { department: dept } });
    };

    return (
        <div className="mobile-main-page">
            <div className="mobile-home-content">
                {/* 인사말 섹션 */}
                <div className="mobile-greeting-section">
                    {isLoggedIn ? (
                        <>
                            <h1 className="mobile-greeting">
                                <span className="mobile-greeting-name">{userName}</span>님 반가워요!
                            </h1>
                            <p className="mobile-greeting-desc">
                                문진 페이지를 작성해 빠른 진료를 받아보세요!
                            </p>
                            <Link to="/consultation" className="mobile-consultation-btn">
                                문진 받기
                            </Link>
                        </>
                    ) : (
                        <>
                            <h1 className="mobile-greeting">
                                안녕하세요!
                            </h1>
                            <p className="mobile-greeting-desc">
                                회원가입하고 더 편리한 진료 서비스를 이용해보세요.
                            </p>
                            <Link to="/signup" className="mobile-consultation-btn">
                                회원가입하기
                            </Link>
                        </>
                    )}
                </div>

                {/* 병원 예약 하기 섹션 */}
                <div className="mobile-section">
                    <h2 className="mobile-section-title">병원 예약 하기</h2>
                    <div className="mobile-department-grid">
                        {departments.map((dept) => (
                            <button
                                key={dept}
                                className="mobile-department-btn"
                                onClick={() => handleDepartmentClick(dept)}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 닥터링크 활용하기 섹션 */}
                <div className="mobile-section">
                    <h2 className="mobile-section-title">닥터링크 활용하기</h2>
                    <div className="mobile-util-grid">
                        <Link to="/hospitalSearch" className="mobile-util-card">
                            <div className="mobile-util-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="mobile-util-title">병원찾기</div>
                        </Link>

                        <Link to="/calendar" className="mobile-util-card">
                            <div className="mobile-util-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="mobile-util-title">캘린더</div>
                        </Link>

                        <Link to="/health" className="mobile-util-card">
                            <div className="mobile-util-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="mobile-util-title">내 건강</div>
                        </Link>
                    </div>
                </div>

                {/* 하단 여백 (네비게이션 바 공간) */}
                <div className="mobile-bottom-spacer"></div>
            </div>

            {/* 하단 네비게이션 바 */}
            <MobileBottomNav />
        </div>
    );
}

