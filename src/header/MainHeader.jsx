import React, { useState, useEffect } from "react"
import "./MainHeader.css";
import Header from "./DL01_Header";
import SideBar from "./DL02_SideBar";

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

const BloodBox = ({ userName, bpReading, graph }) => {

    const sugarReading = "99 mg/dL";
    const sugarStatus = "정상";
    const sugarGraph = "65%"; // 혈당 그래프 비율 (80%가 아닌 65%로 예시)

    const [animatedWidth, setAnimatedWidth] = useState('0%');
    const [animatedSugarWidth, setAnimatedSugarWidth] = useState('0%');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedWidth(graph);
        }, 0);

        return () => clearTimeout(timer);
    }, [graph]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedSugarWidth(sugarGraph); // 혈당 그래프 비율 사용
        }, 0);
        return () => clearTimeout(timer);
    }, [sugarGraph]);

    const sugarBarStyle = {
        width: animatedSugarWidth
    };

    const barStyle = {
        width: animatedWidth // graph는 '75%'와 같은 문자열 형식이어야 함
    };

    // 2. JSX 반환 (이전에 누락되어 오류가 났던 부분)
    return (
        <div className="dashBoard_Box02" style={{ width: "80vh" }}>
            {/* 이름 + 상세조회 버튼 (유지) */}
            <div className="bp-header">
                <span className="bp-name">{userName || "홍길동"}</span>
                <Link to="/mypage" className="bp-detail-button">
                    상세조회 &gt;
                </Link>
            </div>

            {/* 🌟 bp-body: 혈압과 혈당 두 개의 블록을 나열 */}
            <div className="bp-body">

                {/* 1. 혈압 박스 */}
                <div className="bp-metric-item">
                    <div className="bp-data">
                        <span className="bp-title">혈압</span>
                        <div className="bp-reading">
                            {bpReading || "120 / 80"}
                            <span className="bp-status01"> ★ 고혈압 주의</span>
                        </div>
                    </div>
                    {/* 그래프 */}
                    <div className="bp-graph-container">
                        <div className="bp-graph-bar" style={{...barStyle, backgroundColor: "darkorange"}}></div>
                    </div>
                </div>

                {/* 2. 혈당 박스 (하드코딩된 데이터 사용) */}
                <div className="bp-metric-item">
                    <div className="bp-data">
                        <span className="bp-title">혈당</span>
                        <div className="bp-reading">
                            {sugarReading}
                            <span className="bp-status"> ★ {sugarStatus}</span>
                        </div>
                    </div>
                    {/* 그래프 */}
                    <div className="bp-graph-container">
                        <div className="bp-graph-bar" style={sugarBarStyle}></div>
                    </div>
                </div>

            </div>
        </div>
    );
};
// =======================================================


export default function MainHeader() {
    const [eatPill, setEatPill] = useState(3);
    const [eat, setEat] = useState(1);

    // ⭐ useNavigate 훅을 선언하여 라우팅 함수를 사용합니다.
    const navigate = useNavigate();

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
            <Header />

            <main className="mainBody">

                {/* aside */}
                <SideBar />

                {/* article */}
                <article>

                    <div className="dashBoard">
                        <div className="dashBoard_Box">1</div>
                        <div className="dashBoard_Box">2</div>
                        <div className="dashBoard_Box">3</div>
                        <div className="dashBoard_Box">4</div>
                    </div>

                    <div className="dashBoard02">
                        {/* 🌟 BloodBox 컴포넌트 호출 및 props 전달 */}
                        <BloodBox
                            userName="홍길동"
                            bpReading="135 / 95"
                            graph="80%"
                        />
                        <div className="dashBoard_Box02">6</div>
                    </div>
                </article>

            </main>

        </div>
    )
}