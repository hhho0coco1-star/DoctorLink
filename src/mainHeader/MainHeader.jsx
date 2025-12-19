import React, { useState } from "react";
import Header from "./DL01_Header";
import SideBar from "./DL02_SideBar";
import SurveyModal from "./surveyModel/SurveyModel.jsx";

export default function MainHeader() {
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
            </div>
            </main>

        </div>
    );
}