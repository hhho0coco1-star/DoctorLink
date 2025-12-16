import "./MainHeader.css";
import MainHeader from "./MainHeader";

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import {
    FaUserCircle,
    FaBell,
    FaStethoscope,
    FaPills,
    FaCalendarCheck,
    FaUserMd,        // 의료정보 (의사/의학 관련)
    FaHeartbeat,     // 건강기록 (심장 박동/건강)
    FaTrophy,        // 건강목표 (트로피/목표)
    FaUsers,         // 커뮤니티 (사용자 그룹)
    FaCalendarAlt,   // 캘린더 (일정)
    FaCog,           // 설정 (톱니바퀴)
    FaSignOutAlt,     // 로그아웃 (나가기)
    FaDeskpro
} from 'react-icons/fa';

export default function DL01_Header() {

    // 홈페이지 상단 헤드
    return (
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
                    <Link to="/mypage" className="header__profile-link">
                        홍길동<br></br>
                        <span>환자번호:P-2025-1111</span>
                    </Link>
                </div>
            </header>
    )
}
