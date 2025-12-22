import React, { useState } from "react";
import Header from "../mainHeader/DL01_Header.jsx";
import SideBar from "../mainHeader/DL02_SideBar.jsx";
import SurveyModal from "../mainHeader/surveyModel/SurveyModel.jsx";
import PastVisitsTable from './dashboard/PastVisitsTable.js';
import TestResultsTable from './dashboard/TestResultsTable.js';
import LifeReportTable from './dashboard/LifeReportTable.js';
import ConsultationForm from './dashboard/ConsultationForm.js';
import PrescriptionSelector from './dashboard/PrescriptionSelector.js';
// import MainHeader from "../header/MainHeader";

export default function DoctorDashBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="main">
            <Header />
            <main className="mainBody">
                {/* 사이드바에 열기 함수 전달 */}
                <SideBar onOpenSurvey={() => setIsModalOpen(true)} />
                {/* 모달 상태가 true일 때만 컴포넌트 렌더링 */}
                {isModalOpen && <SurveyModal onClose={() => setIsModalOpen(false)} />}

                <div className="main-content">
                    {/* ==================================== add ==================================== */}
                    <div className="dashboard">
                        {/* 상단 좌우 배치 */}
                        <div className="top-section">
                            <PastVisitsTable />
                            <TestResultsTable />
                        </div>

                        {/* 가운데 배치 */}
                        <div className="center-section">
                            <LifeReportTable />
                        </div>

                        {/* 하단 좌우 배치 */}
                        <div className="bottom-section">
                            <ConsultationForm />
                            <PrescriptionSelector />
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}