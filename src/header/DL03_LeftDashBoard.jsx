import "./MainHeader.css";
import "./DL03_LeftDashBoard.css";

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function DL03_BloodBox({ userName, bpReading, graph }) {

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
        width: animatedWidth
    };

    // ========================== return ==========================

    return ( // 👈 BloodBox 함수 안에서 return
        <div className="dashBoard_Box02" style={{ width: "70vh" }}>
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
                            <span className="bp-status"> ★ 고혈압 주의</span>
                        </div>
                    </div>
                    {/* 그래프 */}
                    <div className="bp-graph-container">
                        <div className="bp-graph-bar" style={{ ...barStyle, backgroundColor: "darkorange" }}></div>
                    </div>
                </div>

                {/* 2. 혈당 박스 */}
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
}