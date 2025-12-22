import React, { useState, useEffect } from 'react';
import "./SurveyModel.css";

const surveyQuestions = [
    { id: 'drinking', label: '음주 여부' },
    { id: 'smoking', label: '흡연 여부' },
    { id: 'exercise', label: '운동 여부' },
];

const frequencyOptions = ["주 1~2회", "주 3~4회", "주 5회 이상", "매일"];

export default function SurveyModal({ onClose }) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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
        onClose();
    };

    /* ================= JSX ================= */

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>건강 상세 문진표</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="survey-scroll-area">

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
                                    >
                                        <option value="">-- 빈도 선택 --</option>
                                        {frequencyOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}

                        <hr />

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

                        <hr />

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

                        <button type="button" onClick={handleSavePainRecord}>
                            기록 저장
                        </button>

                        {painRecords.length > 0 && (
                            <ul>
                                {painRecords.map((r, i) => (
                                    <li key={i}>
                                        ===========================================<br></br>
                                        📅 {r.period}<br></br>  {r.location} / 🔥 {r.scale}  /  {r.symptoms}<br></br>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                    <button type="submit" className="submit-btn">제출하기</button>
                </form>
            </div>
        </div>
    );

}