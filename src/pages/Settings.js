import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../pages/MainHeader";
import "./Settings.css";

export default function Settings() {
    const navigate = useNavigate();

    /* ================= 상태 ================= */
    const [isPushEnabled, setIsPushEnabled] = useState(true);
    const [isHospitalPushEnabled, setIsHospitalPushEnabled] = useState(true);
    const [hospitalNotifyType, setHospitalNotifyType] = useState("dayBefore");
    const [medicineTimes, setMedicineTimes] = useState(["08:00"]);

    /* ================= 약 복용 알림 ================= */
    const addMedicineTime = () => {
        setMedicineTimes((prev) => [...prev, ""]);
    };

    const removeMedicineTime = (index) => {
        setMedicineTimes((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const updateMedicineTime = (index, value) => {
        setMedicineTimes((prev) =>
            prev.map((time, i) => (i === index ? value : time))
        );
    };

    /* ================= 렌더 ================= */
    return (
        <MainHeader>
            <div className="settings-content">
                <h2>설정</h2>

                {/* ================= 앱 푸시 ================= */}
                <section className="settings-section">
                    <h3>앱 푸시 알림</h3>

                    <SettingToggle
                        label="푸시 알림 받기"
                        checked={isPushEnabled}
                        onChange={() => setIsPushEnabled((prev) => !prev)}
                    />

                    {isPushEnabled && (
                        <div className="push-detail">
                            {/* 약 복용 알림 */}
                            <div className="settings-item column">
                                <span>약 복용 알림</span>

                                <div className="time-list">
                                    {medicineTimes.map((time, index) => (
                                        <div className="time-row" key={index}>
                                            <input
                                                type="time"
                                                className="time-input"
                                                value={time}
                                                onChange={(e) =>
                                                    updateMedicineTime(index, e.target.value)
                                                }
                                            />

                                            {medicineTimes.length > 1 && (
                                                <button
                                                    className="remove-time"
                                                    onClick={() =>
                                                        removeMedicineTime(index)
                                                    }
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="add-time-btn"
                                    onClick={addMedicineTime}
                                >
                                    + 알림 시간 추가
                                </button>
                            </div>

                            {/* 병원 예약 알림 */}
                            <SettingToggle
                                label="병원 예약 알림"
                                checked={isHospitalPushEnabled}
                                onChange={() =>
                                    setIsHospitalPushEnabled((prev) => !prev)
                                }
                            />

                            {isHospitalPushEnabled && (
                                <div className="settings-item">
                                    <CheckOption
                                        label="하루 전"
                                        checked={hospitalNotifyType === "dayBefore"}
                                        onChange={() =>
                                            setHospitalNotifyType("dayBefore")
                                        }
                                    />
                                    <CheckOption
                                        label="당일"
                                        checked={hospitalNotifyType === "sameDay"}
                                        onChange={() =>
                                            setHospitalNotifyType("sameDay")
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* ================= 웨어러블 ================= */}
                <section className="settings-section">
                    <h3>웨어러블 기기 관리</h3>

                    <div className="device-card">
                        <div>
                            <strong>Galaxy Watch 5 Pro</strong>
                            <p className="device-status">연결됨</p>
                        </div>

                        <div className="device-actions">
                            <button
                                className="device-btn"
                                onClick={() => alert("기기 연동 (페어링 중...)")}
                            >
                                연동
                            </button>
                            <button
                                className="device-btn danger"
                                onClick={() => alert("기기 삭제")}
                            >
                                삭제
                            </button>
                        </div>
                    </div>

                    <button
                        className="settings-btn"
                        onClick={() => alert("새 기기 추가")}
                    >
                        + 기기 추가
                    </button>
                </section>

                {/* ================= 내 정보 ================= */}
                <section className="settings-section">
                    <h3>내 정보</h3>
                    <button
                        className="settings-link"
                        onClick={() => navigate("/mypage")}
                    >
                        내 정보 관리로 이동 →
                    </button>
                </section>
            </div>
        </MainHeader>
    );
}

/* ================= 재사용 UI ================= */

function SettingToggle({ label, checked, onChange }) {
    return (
        <div className="settings-item">
            <span>{label}</span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}

function CheckOption({ label, checked, onChange }) {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
}
