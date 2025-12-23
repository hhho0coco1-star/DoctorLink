import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../mainHeader/surveyModel/SurveyModel.css";
import "./MobileMainPage.css";
import MobileBottomNav from "../components/mobile/MobileBottomNav";

const surveyQuestions = [
    { id: 'drinking', label: '음주 여부' },
    { id: 'smoking', label: '흡연 여부' },
    { id: 'exercise', label: '운동 여부' },
];

const frequencyOptions = ["주 1~2회", "주 3~4회", "주 5회 이상", "매일"];

export default function ConsultationPage() {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState({
        drinking: { checked: false, frequency: "" },
        smoking: { checked: false, frequency: "" },
        exercise: { checked: false, frequency: "" },

        medicalHistory: "",
        medications: "",
        familyHistory: "",

        painLocation: "",
        painScale: "",
        painStartDate: "",
        painEndDate: "",
        painOngoing: false,
        symptoms: ""
    });

    const [painRecords, setPainRecords] = useState([]);

    /* ================= 핸들러 ================= */

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: { ...prev[name], checked }
        }));
    };

    const handleFrequencyChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: { ...prev[name], frequency: value }
        }));
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOngoingChange = (e) => {
        const checked = e.target.checked;
        setAnswers(prev => ({
            ...prev,
            painOngoing: checked,
            painEndDate: checked ? "" : prev.painEndDate
        }));
    };

    const resetPainSection = () => {
        setAnswers(prev => ({
            ...prev,
            painLocation: "",
            painScale: "",
            painStartDate: "",
            painEndDate: "",
            painOngoing: false,
            symptoms: ""
        }));
    };

    const handleSavePainRecord = () => {
        if (
            !answers.painLocation &&
            !answers.painScale &&
            !answers.painStartDate &&
            !answers.symptoms
        ) {
            alert("통증 정보를 입력해주세요.");
            return;
        }

        const newRecord = {
            location: answers.painLocation || "미기재",
            scale: answers.painScale || "미기재",
            period: answers.painOngoing
                ? `${answers.painStartDate || "날짜 미상"} ~ 진행 중`
                : `${answers.painStartDate || "날짜 미상"} ~ ${answers.painEndDate || "종료일 미상"}`,
            symptoms: answers.symptoms || "없음"
        };

        setPainRecords(prev => [...prev, newRecord]);
        resetPainSection();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("최종 제출 데이터", { answers, painRecords });
        alert("설문이 제출되었습니다.");
        navigate("/");
    };

    return (
        <div className="mobile-main-page">
            <div className="mobile-home-content" style={{ paddingBottom: "80px" }}>
                <div style={{ 
                    background: "white", 
                    borderRadius: "12px", 
                    padding: "20px",
                    marginBottom: "20px"
                }}>
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        borderBottom: "1px solid #eee",
                        marginBottom: "20px",
                        paddingBottom: "15px"
                    }}>
                        <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700" }}>건강 상세 문진표</h2>
                        <button 
                            onClick={() => navigate("/")}
                            style={{
                                background: "none",
                                border: "none",
                                fontSize: "24px",
                                cursor: "pointer",
                                color: "#64748b"
                            }}
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="survey-scroll-area" style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>

                            <h3 className="section-title">생활 습관</h3>
                            {surveyQuestions.map(q => (
                                <div key={q.id} className="question-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={q.id}
                                            checked={answers[q.id].checked}
                                            onChange={handleCheckboxChange}
                                        />
                                        {q.label}
                                    </label>

                                    {answers[q.id].checked && (
                                        <select
                                            name={q.id}
                                            value={answers[q.id].frequency}
                                            onChange={handleFrequencyChange}
                                            style={{
                                                width: "100%",
                                                padding: "8px 12px",
                                                marginTop: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "0.9rem"
                                            }}
                                        >
                                            <option value="">-- 빈도 선택 --</option>
                                            {frequencyOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}

                            <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />

                            <h3 className="section-title">병력 및 약물복용</h3>
                            <div className="input-group">
                                <label>기저질환</label>
                                <input name="medicalHistory" value={answers.medicalHistory} onChange={handleTextChange} />
                            </div>
                            <div className="input-group">
                                <label>복용 약물</label>
                                <input name="medications" value={answers.medications} onChange={handleTextChange} />
                            </div>
                            <div className="input-group">
                                <label>가족력</label>
                                <input name="familyHistory" value={answers.familyHistory} onChange={handleTextChange} />
                            </div>

                            <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />

                            <h3 className="section-title">통증 및 증상 (선택)</h3>

                            <div className="input-group">
                                <label>통증 부위</label>
                                <input name="painLocation" value={answers.painLocation} onChange={handleTextChange} />
                            </div>

                            <div className="input-group">
                                <label>통증 정도</label>
                                <div className="pain-scale-group">
                                    {[...Array(10)].map((_, i) => {
                                        const v = String(i + 1);
                                        return (
                                            <label key={v} className="pain-radio">
                                                <input
                                                    type="radio"
                                                    name="painScale"
                                                    value={v}
                                                    checked={answers.painScale === v}
                                                    onChange={handleTextChange}
                                                />
                                                <span>{v}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <label className="ongoing-label">
                                현재도 통증이 있음 (진행형)
                                <input type="checkbox" checked={answers.painOngoing} onChange={handleOngoingChange} />
                            </label>

                            <div className="input-group">
                                <label>통증 시작일</label>
                                <input type="date" name="painStartDate" value={answers.painStartDate} onChange={handleTextChange} />
                            </div>


                            <div className="input-group">
                                <label>통증 종료일</label>
                                <input
                                    type="date"
                                    name="painEndDate"
                                    value={answers.painEndDate}
                                    onChange={handleTextChange}
                                    disabled={answers.painOngoing}
                                />
                            </div>

                            <div className="input-group">
                                <label>기타 증상</label>
                                <textarea name="symptoms" value={answers.symptoms} onChange={handleTextChange} />
                            </div>

                            <button 
                                type="button" 
                                onClick={handleSavePainRecord}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginBottom: "15px",
                                    background: "#eef4ff",
                                    color: "#1f4fd6",
                                    border: "1px solid #bcd3ff",
                                    borderRadius: "8px",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                기록 저장
                            </button>

                            {painRecords.length > 0 && (
                                <ul style={{ 
                                    listStyle: "none", 
                                    padding: 0,
                                    marginBottom: "20px"
                                }}>
                                    {painRecords.map((r, i) => (
                                        <li key={i} style={{
                                            background: "#f5f7fa",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            marginBottom: "10px",
                                            fontSize: "0.85rem",
                                            lineHeight: "1.6"
                                        }}>
                                            ===========================================<br></br>
                                            📅 {r.period}<br></br>  {r.location} / 🔥 {r.scale}  /  {r.symptoms}<br></br>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>

                        <button 
                            type="submit" 
                            className="submit-btn"
                            style={{
                                width: "100%",
                                padding: "14px",
                                marginTop: "20px",
                                background: "#1f4fd6",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "700",
                                cursor: "pointer"
                            }}
                        >
                            제출하기
                        </button>
                    </form>
                </div>
            </div>

            {/* 하단 네비게이션 바 */}
            <MobileBottomNav />
        </div>
    );
}

