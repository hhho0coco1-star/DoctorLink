// import "./MainHeader.css";
import "./DL02_SideBar.css";
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

export default function DL02_SideBar( { onOpenSurvey } ) {

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

        <aside>
            <div className="aside1">
                <p style={{ fontSize: "0.9rem", margin: "1vh", color: "white", height:"900"}}>빠른 작업</p>
                <div className="aside_box1" onClick={handlePillCheck}>
                    <FaPills style={{ marginRight: '10px' }} />
                    <div className="text-wrapper">
                        <div>약 복용체크</div>
                        <div style={{ fontSize: "10px" }}>Today: {eatPill}회</div>
                    </div>
                </div>
                <div className="aside_box1" onClick={onOpenSurvey} style={{ cursor: 'pointer' }}>
                    <FaCalendarCheck style={{ marginRight: '10px' }} />건강기록 (문진표)
                </div>
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

    )
}