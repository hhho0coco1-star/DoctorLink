import React, { useState } from "react";
import Header from "./DL01_Header";
import SideBar from "./DL02_SideBar";
import SurveyModal from "../surveyModel/SurveyModel.jsx";

import { useParams } from "react-router-dom";
import BloodSugarTable from "./patientinfo/BloodSugarTable";
import BloodPressureData from "./patientinfo/BloodPressureData";
import WeeklyReport from "./patientinfo/WeeklyReport";
import { lifeReportData } from "../data/dummyData";
// import MainHeader from "../header/MainHeader";
import "./patientinfo/Table.css";
import SleepData from "./patientinfo/SleepData";

export default function PatientDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("bloodSugar");
    const { id } = useParams();

    // URL의 id로 해당 환자 찾기
    const patient = lifeReportData.find((p) => p.id === parseInt(id));

    if (!patient) {
        return (
            <div className="main">
                <Header />
                <main className="mainBody">
                    {/* 사이드바에 열기 함수 전달 */}
                    <SideBar onOpenSurvey={() => setIsModalOpen(true)} />
                    {/* 모달 상태가 true일 때만 컴포넌트 렌더링 */}
                    {isModalOpen && <SurveyModal onClose={() => setIsModalOpen(false)} />}

                    <div></div>
                    <div className="detail-page">
                        <h2>환자 정보를 찾을 수 없습니다.</h2>
                    </div>
                </main>

            </div>
        );
    }

    return (
        <div className="main">
            <Header />
            <main className="mainBody">
                {/* 사이드바에 열기 함수 전달 */}
                <SideBar onOpenSurvey={() => setIsModalOpen(true)} />
                {/* 모달 상태가 true일 때만 컴포넌트 렌더링 */}
                {isModalOpen && <SurveyModal onClose={() => setIsModalOpen(false)} />}

                <div>
                    {/* ==================================== add ==================================== */}
                    <div className="detail-page">
                        <h2>{patient.name} 상세 정보</h2>

                        {/* 탭 버튼 */}
                        <div className="tabs">
                            <button
                                className={activeTab === "bloodSugar" ? "active" : ""}
                                onClick={() => setActiveTab("bloodSugar")}
                            >
                                혈당
                            </button>
                            <button
                                className={activeTab === "bloodPressure" ? "active" : ""}
                                onClick={() => setActiveTab("bloodPressure")}
                            >
                                혈압
                            </button>
                            <button
                                className={activeTab === "sleep" ? "active" : ""}
                                onClick={() => setActiveTab("sleep")}
                            >
                                수면
                            </button>
                        </div>

                        {/* 탭 내용 */}
                        <div className="tab-content">
                            {activeTab === "bloodSugar" && (
                                <div>
                                    <WeeklyReport
                                        data={patient.dummyData}
                                        title="혈당 그래프"
                                        lines={[
                                            { dataKey: "fasting", color: "#8884d8", label: "공복" },
                                            { dataKey: "beforeBreakfast", color: "#82ca9d", label: "아침 전" },
                                            { dataKey: "afterBreakfast", color: "#ffc658", label: "아침 후" },
                                            { dataKey: "beforeLunch", color: "#9cdd23ff", label: "점심 전" },
                                            { dataKey: "afterLunch", color: "#d7e60cff", label: "점심 후" },
                                            { dataKey: "beforeDinner", color: "#1ee60cff", label: "저녁 전" },
                                            { dataKey: "afterDinner", color: "#220ce6ff", label: "저녁 후" },
                                            { dataKey: "beforeSleep", color: "#c20ce6ff", label: "취침 전" },
                                        ]}
                                    />
                                    <BloodSugarTable data={patient.dummyData} />
                                </div>
                            )}

                            {activeTab === "bloodPressure" && (
                                <div>
                                    <WeeklyReport
                                        data={patient.bloodPressureData}
                                        title="혈압 그래프"
                                        lines={[
                                            { dataKey: "systolic", color: "#ff7300", label: "수축기" },
                                            { dataKey: "diastolic", color: "#387908", label: "이완기" },
                                        ]}
                                        chartType="bar"
                                    />
                                    <BloodPressureData patient={patient} />

                                </div>
                            )}

                            {activeTab === "sleep" && (
                                <div>
                                    <WeeklyReport
                                        data={patient.sleepData}
                                        title="수면 그래프"
                                        lines={[{ dataKey: "hours", color: "#0088fe", label: "수면 시간" }]}
                                    />
                                    {/* 수면 데이터 테이블을 따로 만들고 싶으면 SleepTable 컴포넌트 추가 */}
                                    <SleepData data={patient.sleepData} />

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}