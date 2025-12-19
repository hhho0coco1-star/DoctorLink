// import "./MainHeader.css";
import "./DL02_SideBar.css";
import MainHeader from "./MainHeader";

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Login from "../logIn/Login";
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

export default function DL02_SideBar({ onOpenSurvey }) {

    const { loginTry, setLoginTry } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        setLoginTry(false);
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const [eatPill, setEatPill] = useState(3);
    const [eat, setEat] = useState(1);

    // 약 복용 (클릭 이벤트)

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

        <aside className="aside_Main">
            <div className="aside1">
                <p style={{ fontSize: "0.9rem", margin: "1vh", height: "900", fontWeight: "500" }}>빠른 작업</p>


                <div
                    className="aside_box1"
                    onClick={() => {
                        if (loginTry) {
                            handlePillCheck(); // 로그인 상태면 약 복용 함수 실행
                        } else {
                            alert("로그인이 필요한 서비스입니다."); // 아니면 경고창
                            navigate("/login"); // 로그인 페이지로 유도 (선택 사항)
                        }
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <FaPills style={{ marginRight: '10px' }} />
                    <div className="text-wrapper">
                        <div>약 복용체크</div>
                        <div style={{ fontSize: "10px" }}>Today: {loginTry ? eatPill : 0}회</div>
                    </div>
                </div>

                <div className="aside_box1" onClick={() => {
                    if (loginTry) {
                        onOpenSurvey();
                    } else {
                        alert("로그인이 필요한 서비스입니다."); // 아니면 경고창
                        navigate("/login"); // 로그인 페이지로 유도 (선택 사항)
                    }
                }} style={{ cursor: 'pointer' }}>
                    <FaCalendarCheck style={{ marginRight: '10px' }} />건강기록 (문진표)
                </div>
            </div>

            <div className="aside2">
                <div className="aside1_box1 aside2_box" onClick={() => {
                        if (loginTry) {
                            navigate("/dashboard");
                        } else {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                        }
                    }}>
                    <FaUserMd style={{ marginRight: '10px' }} />의료진(전용)</div>
                <div className="aside1_box2 aside2_box">
                    <FaHeartbeat style={{ marginRight: '10px' }} />병원예약</div>
                <div className="aside1_box5 aside2_box" >
                    <FaUsers style={{ marginRight: '10px' }} />커뮤니티</div>
                <div className="aside1_box6 aside2_box" onClick={() => {
                        if (loginTry) {
                            navigate("/calendar");
                        } else {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                        }
                    }}>
                    <FaCalendarAlt style={{ marginRight: '10px' }} />캘린더</div>
                <div className="aside1_box6 aside2_box">
                    <FaCog style={{ marginRight: '10px' }} />설정</div>

                {loginTry ? (
                    <div className="aside2_box" onClick={handleLogoutClick}>
                        <FaSignOutAlt style={{ marginRight: '10px' }} />로그아웃</div>
                ) : (
                    <div className="aside2_box" onClick={handleLoginClick}>
                        <FaSignOutAlt style={{ marginRight: '10px' }} />로그인</div>
                )}
            </div>
        </aside>

    )
}