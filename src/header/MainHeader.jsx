import React, { useState } from "react"
import "./MainHeader.css";
import { FaUserCircle, FaBell, FaStethoscope, FaPills, FaCalendarCheck } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { 
    FaUserMd,        // 의료정보 (의사/의학 관련)
    FaHeartbeat,     // 건강기록 (심장 박동/건강)
    FaTrophy,        // 건강목표 (트로피/목표)
    FaUsers,         // 커뮤니티 (사용자 그룹)
    FaCalendarAlt,   // 캘린더 (일정)
    FaCog,           // 설정 (톱니바퀴)
    FaSignOutAlt     // 로그아웃 (나가기)
} from 'react-icons/fa';

export default function MainHeader() {
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
    }

    return (
        <div className="main">
            {/* header */}
            <header>

                <Link to="/" className="header__logo-link">
                    <h1 className="header_1 header__logo">
                        <FaStethoscope className="logo-icon" />
                        <span>DoctorLink</span></h1>
                </Link>

                <div className="header_2">
                    <h2>안녕하세요. 홍길동님</h2>
                    <p>오늘도 건강한 하루 되세요!</p>
                </div>

                <div className="header_3">
                    <Link to="/myPage" className="header__profile-link">
                        홍길동<br></br>
                        <span>환자번호:P-2025-1111</span>
                    </Link>
                </div>

            </header>

            <main>

                {/* aside */}
                <aside>
                    <div className="aside1">
                        <p style={{ fontSize: "0.9rem", margin: "1vh" }}>빠른 작업</p>
                        <div className="aside_box1" onClick={handlePillCheck} style={{ cursor: "pointer" }}>
                            <FaPills style={{ marginRight: '10px' }} />
                            <div className="text-wrapper">
                                <div>약 복용체크</div>
                                <div style={{ fontSize: "10px" }}>Today: {eatPill}회</div>
                            </div>
                        </div>
                        <Link to="/calendar" className="calender_css">
                            <div className="aside_box1">
                                <FaCalendarCheck style={{ marginRight: '10px' }} />병원예약</div>
                        </Link>
                    </div>

                    <div className="aside2">
                        <div className="aside1_box1">
                            <FaUserMd style={{ marginRight: '10px' }} />의료정보</div>
                        <div className="aside1_box2">
                            <FaHeartbeat style={{ marginRight: '10px' }} />건강기록</div>
                        <div className="aside1_box3">
                            <FaTrophy style={{ marginRight: '10px' }} />건강목표</div>
                        <div className="aside1_box5">
                            <FaUsers style={{ marginRight: '10px' }} />커뮤니티</div>
                        <div className="aside1_box6">
                            <FaCalendarAlt style={{ marginRight: '10px' }} />캘린더</div>
                        <div className="aside1_box6">
                            <FaCog style={{ marginRight: '10px' }} />설정</div>
                        <div className="aside1_box6">
                            <FaSignOutAlt style={{ marginRight: '10px' }} />로그아웃</div>
                    </div>
                </aside>

                {/* article */}
                <article>
                    {/* @@@ */}
                </article>

            </main>

        </div>
    )
}