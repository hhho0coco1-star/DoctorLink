import React, { useState } from "react";
import Header from "./DL01_Header";
import SideBar from "./DL02_SideBar";
import SurveyModal from "./surveyModel/SurveyModel.jsx";

export default function MainHeader({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="main">
            <Header />

            <main className="mainBody">
                {/* 사이드바 */}
                <SideBar onOpenSurvey={() => setIsModalOpen(true)} />

                {/* 설문 모달 */}
                {isModalOpen && (
                    <SurveyModal onClose={() => setIsModalOpen(false)} />
                )}

                {/* ⭐⭐⭐ 여기 핵심 ⭐⭐⭐ */}
                <div className="main-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
