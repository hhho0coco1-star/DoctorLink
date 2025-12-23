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

    const calendarStorageKey = "calendarEvents";
    const today = new Date().getDate();

    // 오늘 날짜의 미복용 약 개수 가져오기
    const getTodayUnTakenCount = () => {
        try {
            const raw = localStorage.getItem(calendarStorageKey);
            if (!raw) return 0;
            const events = JSON.parse(raw);
            const todayEvents = events[today] || [];
            return todayEvents.filter(e => e.type === "medication" && !e.taken).length;
        } catch (e) {
            return 0;
        }
    };

    const [unTakenCount, setUnTakenCount] = useState(getTodayUnTakenCount);

    // localStorage 변경 감지하여 카운트 업데이트
    useEffect(() => {
        const handleStorageChange = () => {
            setUnTakenCount(getTodayUnTakenCount());
        };

        // localStorage 변경 감지를 위한 인터벌 (더 정확한 방법은 CustomEvent 사용)
        const interval = setInterval(handleStorageChange, 500);
        
        // 페이지 포커스 시에도 업데이트
        window.addEventListener('focus', handleStorageChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', handleStorageChange);
        };
    }, []);

    // 약 복용 (캘린더의 markTodayTaken과 동일한 기능)
    const handlePillCheck = () => {
        try {
            const raw = localStorage.getItem(calendarStorageKey);
            const events = raw ? JSON.parse(raw) : {};
            const todayEvents = events[today] || [];
            
            // 오늘 날짜의 약이 있는지 확인
            const todayMedications = todayEvents.filter(e => e.type === "medication");
            if (todayMedications.length === 0) {
                alert("오늘 복용할 약이 없습니다.");
                return;
            }

            // 이미 모두 복용했는지 확인
            const unTakenMeds = todayMedications.filter(e => !e.taken);
            if (unTakenMeds.length === 0) {
                alert("오늘의 약 복용을 모두 완료했습니다.");
                setUnTakenCount(0);
                return;
            }

            // 오늘 날짜의 모든 약을 복용 완료 처리
            const updatedEvents = {
                ...events,
                [today]: todayEvents.map(e =>
                    e.type === "medication" ? { ...e, taken: true } : e
                )
            };

            localStorage.setItem(calendarStorageKey, JSON.stringify(updatedEvents));
            setUnTakenCount(0);
            
            // 캘린더 페이지에 변경사항 알림
            window.dispatchEvent(new CustomEvent('calendarEventsUpdated', { detail: { events: updatedEvents } }));
            
            alert(`오늘의 약 ${unTakenMeds.length}개 복용 완료되었습니다.`);
        } catch (e) {
            console.error("약 복용 체크 오류:", e);
            alert("약 복용 체크 중 오류가 발생했습니다.");
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
                        <div style={{ fontSize: "10px" }}>Today: {loginTry ? unTakenCount : 0}개</div>
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

                <div className="aside1_box2 aside2_box" onClick={() => {
                        if (loginTry) {
                            navigate("/hospitalSearch");
                        } else {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                        }
                    }}>
                    <FaHeartbeat style={{ marginRight: '10px' }} />병원예약</div>

                <div className="aside1_box5 aside2_box"  onClick={() => {
                        if (loginTry) {
                            navigate("/community");
                        } else {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                        }
                    }}>
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
                    
                <div className="aside1_box6 aside2_box" onClick={() => {
                        if (loginTry) {
                            navigate("/settings");
                        } else {
                            alert("로그인이 필요한 서비스입니다.");
                            navigate("/login");
                        }
                    }}>
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