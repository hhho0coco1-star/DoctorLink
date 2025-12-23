import Header from "../mainHeader/DL01_Header.jsx";
import SideBar from "../mainHeader/DL02_SideBar.jsx";
import LeftDashBoard from "./DL03_LeftDashBoard.jsx";
import RightDashBoard from "./DL05_RightDashBoard.jsx";
import SurveyModal from "../mainHeader/surveyModel/SurveyModel.jsx";

import "./MainPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {

    /* ================= 추가 (기존 코드 안 건드림) ================= */
    const navigate = useNavigate();
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        const isFirstLogin = localStorage.getItem("doctorlink_first_login");
        if (isFirstLogin) {
            setShowGuide(true);
            localStorage.removeItem("doctorlink_first_login");
        }
    }, []);
    /* ============================================================= */

    /* ================= 기존 상태 ================= */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [reservations, setReservations] = useState([]);
    const [medications, setMedications] = useState([]);

    const [infoModal, setInfoModal] = useState({
        open: false,
        title: "",
        message: ""
    });

    /* ================= calendarEvents 읽기 ================= */
    useEffect(() => {
        try {
            const raw = localStorage.getItem("calendarEvents");
            if (!raw) return;

            const parsed = JSON.parse(raw);
            const reservationList = [];
            const medicationList = [];

            Object.entries(parsed).forEach(([day, events]) => {
                (events || []).forEach(e => {
                    if (e.type === "reservation") {
                        reservationList.push({ day, title: e.title });
                    }
                    if (e.type === "medication") {
                        medicationList.push({
                            day,
                            name: e.name,
                            dose: e.dose,
                            taken: e.taken
                        });
                    }
                });
            });

            setReservations(reservationList);
            setMedications(medicationList);

        } catch (e) {
            console.error("calendarEvents 파싱 오류", e);
        }
    }, []);

    /* ================= 모달 제어 ================= */
    const openInfoModal = (title, message) => {
        setInfoModal({ open: true, title, message });
    };

    const closeInfoModal = () => {
        setInfoModal(prev => ({ ...prev, open: false }));
    };

    /* ================= 더미 데이터 ================= */
    const mockTestResults = [
        "혈액 검사 결과: 전반적으로 정상 범위입니다.",
        "소변 검사 결과: 특이 소견이 없습니다."
    ];

    const mockMessages = [
        "의료진: 다음 진료 전 금식이 필요합니다.",
        "병원 안내: 예약 시간이 변경되었습니다.",
        "의료진: 검사 결과에 대한 상담이 필요합니다."
    ];

    /* ================= JSX ================= */
    return (
        <div className="main">
            <Header />

            <main className="mainBody">
                <SideBar onOpenSurvey={() => setIsModalOpen(true)} />

                {isModalOpen && (
                    <SurveyModal onClose={() => setIsModalOpen(false)} />
                )}

                <div className="article_dashBoard">
                    <div className="dashBoard">

                        {/* 예정된 진료 */}
                        <div
                            className="appointment-card"
                            onClick={() =>
                                openInfoModal(
                                    "예정된 진료",
                                    reservations.length === 0
                                        ? "현재 예정된 진료가 없습니다."
                                        : reservations
                                            .map((r, i) => `${i + 1}. ${r.day}일 · ${r.title}`)
                                            .join("\n")
                                )
                            }
                        >
                            <div className="card-header">
                                <div className="calendar-icon">📅</div>
                                <span className="appointment-tag">진료</span>
                            </div>
                            <div className="card-body">
                                <div className="number">{reservations.length}</div>
                                <div className="description">예정된 진료</div>
                            </div>
                        </div>

                        {/* 새 검사 결과 */}
                        <div
                            className="appointment-card"
                            style={{ background: "linear-gradient(135deg, #7c58e5, #5a30b3)" }}
                            onClick={() =>
                                openInfoModal("새 검사 결과", mockTestResults.join("\n"))
                            }
                        >
                            <div className="card-header">
                                <div className="calendar-icon">📄</div>
                                <span className="appointment-tag">신규</span>
                            </div>
                            <div className="card-body">
                                <div className="number">{mockTestResults.length}</div>
                                <div className="description">새 검사결과</div>
                            </div>
                        </div>

                        {/* 복용 중인 약 */}
                        <div
                            className="appointment-card"
                            style={{ background: "linear-gradient(135deg, #f0587d, #d13063)" }}
                            onClick={() =>
                                openInfoModal(
                                    "복용 중인 약",
                                    medications.length === 0
                                        ? "현재 복용 중인 약이 없습니다."
                                        : medications
                                            .map((m, i) => `${i + 1}. ${m.name} ${m.dose} (${m.day}일)`)
                                            .join("\n")
                                )
                            }
                        >
                            <div className="card-header">
                                <div className="calendar-icon">💊</div>
                                <span className="appointment-tag">처방</span>
                            </div>
                            <div className="card-body">
                                <div className="number">{medications.length}</div>
                                <div className="description">복용중인 약</div>
                            </div>
                        </div>

                        {/* 새 메시지 */}
                        <div
                            className="appointment-card"
                            style={{ background: "linear-gradient(135deg, #f7934c, #e0722e)" }}
                            onClick={() =>
                                openInfoModal("새 메시지", mockMessages.join("\n"))
                            }
                        >
                            <div className="card-header">
                                <div className="calendar-icon">💬</div>
                                <span className="appointment-tag">메세지</span>
                            </div>
                            <div className="card-body">
                                <div className="number">{mockMessages.length}</div>
                                <div className="description">새 메세지</div>
                            </div>
                        </div>

                    </div>

                    <div className="dashBoard02">
                        <LeftDashBoard userName="홍길동" bpReading="135 / 95" graph="80%" />
                        <div className="dashBoard_Box02" style={{ backgroundColor: "lightskyblue" }}>
                            <RightDashBoard />
                        </div>
                    </div>
                </div>
            </main>

            {/* ===== 기존 정보 모달 ===== */}
            {infoModal.open && (
                <div className="modal-overlay modal-fade">
                    <div className="modal-content dashboard-modal">
                        <div className="modal-header dashboard-modal-header">
                            <h3>{infoModal.title}</h3>
                            <button className="close-btn" onClick={closeInfoModal}>×</button>
                        </div>
                        <div className="dashboard-modal-body">
                            {infoModal.message.split("\n").map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                        <div className="dashboard-modal-footer">
                            <button className="dashboard-confirm-btn" onClick={closeInfoModal}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== 최초 로그인 가이드 (추가) ===== */}
            {showGuide && (
                <div className="guide-overlay">
                    <div className="guide-modal">
                        <h3>환영합니다 👋</h3>
                        <p className="guide-desc">
                            빠르고 정확한 진단을 위해<br />
                            기본적인 세팅을 완료해주세요.
                        </p>

                        <ul className="guide-list">
                            <li onClick={() => navigate("/settings")}>⌚ 웨어러블 기기 등록</li>
                            <li onClick={() => setShowGuide(false)}>📝 내 건강 체크 (문진표)</li>
                            <li onClick={() => navigate("/calendar")}>💊 복용 약 등록</li>
                        </ul>

                        <button className="guide-close-btn" onClick={() => setShowGuide(false)}>
                            나중에 할게요
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
