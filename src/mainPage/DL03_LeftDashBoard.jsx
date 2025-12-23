import "../mainHeader/MainHeader.css";
import "./DL03_LeftDashBoard.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { lifeReportData } from "../data/dummyData";

export default function DL03_BloodBox({ userName = "홍길동" }) {

    // 1. 데이터 추출
    const userReport = lifeReportData.find(user => user.name === userName);
    const sugarLog = userReport?.dummyData || [];
    const bpLog = userReport?.bloodPressureData || [];

    const latestSugarObj = sugarLog.length > 0 ? sugarLog[sugarLog.length - 1] : null;
    const latestBpObj = bpLog.length > 0 ? bpLog[bpLog.length - 1] : null;

    // 2. 혈당 평균값 계산
    const calculateSugarAverage = (obj) => {
        if (!obj) return 0;
        const values = Object.values(obj).filter(val => typeof val === 'number');
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        return Math.round(sum / values.length);
    };

    const sugarAvg = calculateSugarAverage(latestSugarObj);

    // 3. 수치별 그래프 너비 계산 함수
    const getGraphWidth = (type, value) => {
        if (!value) return "0%";
        let percentage = 0;
        if (type === "bp") {
            // 혈압: 80~180 범위를 0~100%로 환산
            percentage = ((value - 80) / (180 - 80)) * 100;
        } else if (type === "sugar") {
            // 혈당: 70~200 범위를 0~100%로 환산
            percentage = ((value - 70) / (200 - 70)) * 100;
        }
        return `${Math.min(Math.max(percentage, 5), 100)}%`;
    };

    // 4. 상태 및 색상 판별 로직
    const getStatus = (type, value) => {
        if (type === "bp") return value >= 135 ? "주의" : "정상";
        if (type === "sugar") return value >= 120 ? "주의" : "정상";
        return "정상";
    };

    const bpStatus = getStatus("bp", latestBpObj?.systolic);
    const sugarStatus = getStatus("sugar", sugarAvg);

    // 5. 애니메이션 및 너비 제어 (하나의 useEffect로 통합)
    const [animatedBpWidth, setAnimatedBpWidth] = useState('0%');
    const [animatedSugarWidth, setAnimatedSugarWidth] = useState('0%');

    useEffect(() => {
        const timer = setTimeout(() => {
            // 고정값(50%, 85%)이 아닌 계산된 함수 호출값을 사용합니다.
            setAnimatedBpWidth(getGraphWidth("bp", latestBpObj?.systolic));
            setAnimatedSugarWidth(getGraphWidth("sugar", sugarAvg));
        }, 100);
        return () => clearTimeout(timer);
    }, [latestBpObj, sugarAvg]); // 의존성 배열 확인

    return (
        <div className="dashBoard_Box02" style={{ width: "70vh" }}>
            <div className="bp-header">
                <span className="bp-name">{userName}</span>
                <span className="bp-date-label">
                    최근 기록일: {latestBpObj?.date || "기록 없음"}
                </span>
                <Link to={`/patient/${userReport?.id || 1}`} className="bp-detail-button">
                    상세조회 &gt;
                </Link>
            </div>

            <div className="bp-body">
                {/* 혈압 섹션 */}
                <div className="bp-metric-item">
                    <div className="bp-data">
                        <span className="bp-title">혈압</span>
                        <div className="bp-reading">
                            {latestBpObj ? `${latestBpObj.systolic}/${latestBpObj.diastolic} mmHg` : "--/--"}
                            <span className={`bp-status ${bpStatus === "주의" ? "status-warn" : ""}`}>
                                ★ {bpStatus}
                            </span>
                        </div>
                    </div>
                    <div className="bp-graph-container">
                        <div
                            className="bp-graph-bar"
                            style={{
                                width: animatedBpWidth,
                                backgroundColor: bpStatus === "정상" ? "#2ecc71" : "#e67e22",
                            }}
                        ></div>
                    </div>
                </div>

                {/* 혈당 섹션 */}
                <div className="bp-metric-item">
                    <div className="bp-data">
                        <span className="bp-title">혈당 (일일평균)</span>
                        <div className="bp-reading">
                            {sugarAvg > 0 ? `${sugarAvg} mg/dL` : "기록 없음"}
                            <span className={`bp-status ${sugarStatus === "주의" ? "status-warn" : ""}`}>
                                ★ {sugarStatus}
                            </span>
                        </div>
                    </div>
                    <div className="bp-graph-container">
                        <div
                            className="bp-graph-bar"
                            style={{
                                width: animatedSugarWidth,
                                backgroundColor: sugarStatus === "정상" ? "#2ecc71" : "#e67e22",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}