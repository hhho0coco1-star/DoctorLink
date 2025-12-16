import React, { useState } from "react";
import "./MainHeader.css";
import { FaStethoscope, FaPills, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    FaUserMd,
    FaHeartbeat,
    FaTrophy,
    FaUsers,
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

/* ✅ children 받기 */
export default function MainHeader({ children }) {
    const [eatPill, setEatPill] = useState(3);
    const [eat, setEat] = useState(1);

    const handlePillCheck = () => {
        if (eatPill > 0) {
            alert(`약 ${eat}회 복용완료`);
            setEatPill(eatPill - 1);
            setEat(eat + 1);
        } else {
            alert("오늘의 약 복용을 모두 완료했습니다.");
        }
    };

    return (
        <div className="main">
            {/* header */}
            <header>
                <Link to="/" className="header__logo-link">
                    <h1 className="header_1 header__logo">
                        <FaStethoscope className="logo-icon" />
                        <span>DoctorLink</span>
                    </h1>
                </Link>

                <div className="header_2">
                    <h2>안녕하세요. 홍길동님</h2>
                    <p>오늘도 건강한 하루 되세요!</p>
                </div>

                <div className="header_3">
                    <Link to="/myPage" className="header__profile-link">
                        홍길동<br />
                        <span>환자번호:P-2025-1111</span>
                    </Link>
                </div>
            </header>

            {/* body */}
            <main className="mainBody">
                {/* 왼쪽 사이드바 */}
                <aside>
                    <div className="aside1">
                        <p style={{ fontSize: "0.9rem", margin: "1vh" }}>
                            빠른 작업
                        </p>

                        <div
                            className="aside_box1"
                            onClick={handlePillCheck}
                            style={{ cursor: "pointer" }}
                        >
                            <FaPills style={{ marginRight: "10px" }} />
                            <div className="text-wrapper">
                                <div>약 복용체크</div>
                                <div style={{ fontSize: "10px" }}>
                                    Today: {eatPill}회
                                </div>
                            </div>
                        </div>

                        <Link to="/calendar" className="calender_css">
                            <div className="aside_box1">
                                <FaCalendarCheck style={{ marginRight: "10px" }} />
                                병원예약
                            </div>
                        </Link>
                    </div>

                    <div className="aside2">
                        <div><FaUserMd /> 의료정보</div>
                        <div><FaHeartbeat /> 건강기록</div>
                        <div><FaTrophy /> 건강목표</div>
                        <div><FaUsers /> 커뮤니티</div>
                        <div><FaCalendarAlt /> 캘린더</div>
                        <div><FaCog /> 설정</div>
                        <div><FaSignOutAlt /> 로그아웃</div>
                    </div>
                </aside>

                {/* ✅ 여기!! MyPage가 렌더링되는 영역 */}
                <section className="main-content">
                    {children}
                </section>
            </main>
        </div>
    );
}
