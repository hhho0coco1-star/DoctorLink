import "./MainHeader.css";
import "./DL01_Header.css";
import MainHeader from "./MainHeader";

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

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

    const { loginTry, setLoginTry } = useAuth();

    // 홈페이지 상단 헤드
    return (
        <header className="header_Right01">
            <Link to="/mainpage" className="header__logo-link">
                <h1 className="header_1 header__logo">
                    <FaStethoscope className="logo-icon" />
                    <span>DoctorLink</span></h1>
            </Link>

            <div className="header_2">

                <h2>
                    {loginTry ? "안녕하세요. 홍길동님" : "안녕하세요. DoctorLink입니다!"}
                </h2>
                <p>오늘도 건강한 하루 되세요!</p>
            </div>


            {loginTry ? (
                <>
                    <div className="header_3">
                        <Link to="/mypage" className="header__profile-link">
                            <span className="header_3_name">홍길동</span>
                            <br></br>
                            <span className="header_3_info" style={{fontWeight: "500"}}>환자번호:P-2025-1111</span>
                        </Link>
                    </div>
                </>) : (
                <div className="header_3"
                    style={{
                        textAlign: "center",
                        fontWeight: "500",
                    }}>
                    <Link to="/login" style={{
                        textDecoration: "none",
                        color: "black",
                    }}>
                        <div>
                            <span>클릭하여 편리하게 이용하세요</span>
                            <br></br>
                            <span>▶ DoctorLink 로그인 ◀</span>
                        </div>
                    </Link>
                </div>
            )}

        </header>
    )
}
