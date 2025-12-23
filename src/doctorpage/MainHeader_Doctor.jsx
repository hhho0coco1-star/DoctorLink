import React, { useState } from "react";
import Header from "./Header_Doctor.jsx";
import SideBar from "./SideBar_Doctor.jsx";
// import SurveyModal from "./surveyModel/SurveyModel.jsx";

export default function MainHeader({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="main">
            <Header />

            <main className="mainBody">
                {/* 사이드바 */}
                <SideBar onOpenSurvey={() => setIsModalOpen(true)} />

                {/* ⭐⭐⭐ 여기 핵심 ⭐⭐⭐ */}
                <div className="main-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
