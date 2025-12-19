import React, { useState, useEffect } from 'react';
import "./SurveyModel.css";

const surveyQuestions = [
    { id: 'drinking', label: '음주 여부', description: '최근 1주일 내에 술을 마신 적이 있나요?' },
    { id: 'smoking', label: '흡연 여부', description: '현재 담배를 피우고 계신가요?' },
    { id: 'exercise', label: '운동 여부', description: '주 3회 이상 규칙적인 운동을 하시나요?' },
];

const frequencyOptions = ["주 1~2회", "주 3~4회", "주 5회 이상", "매일"];

export default function SurveyModal({ onClose }) {

    // 2. 외부 스크롤 방지 로직 추가
    useEffect(() => {
        // 모달이 열릴 때 바디 스크롤 막기
        document.body.style.overflow = 'hidden';
        
        // 모달이 닫힐 때 원래대로 복구 (Cleanup 함수)
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const [answers, setAnswers] = useState({
        // 생활 습관 (체크박스 + 선택)
        drinking: { checked: false, frequency: "" },
        smoking: { checked: false, frequency: "" },
        exercise: { checked: false, frequency: "" },
        // [추가] 병력 및 증상 (텍스트 입력)
        medicalHistory: "", // 기저질환
        medications: "",    // 복용약물
        familyHistory: "",   // 가족력
        painLocation: "",    // 통증부위
        symptoms: ""         // 전신증상
    });

    // 체크박스/선택 핸들러
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setAnswers({ ...answers, [name]: { ...answers[name], checked } });
    };

    const handleFrequencyChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, [name]: { ...answers[name], frequency: value } });
    };

    // [추가] 텍스트 입력 핸들러
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('최종 결과:', answers);
        alert('설문이 제출되었습니다!');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>건강 상세 문진표</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="survey-form">
                    <div className="survey-scroll-area" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                        
                        {/* 1. 생활 습관 섹션 */}
                        <h3 className="section-title">생활 습관</h3>
                        {surveyQuestions.map((q) => (
                            <div key={q.id} className="question-group" style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }}>
                                    <input
                                        type="checkbox"
                                        name={q.id}
                                        checked={answers[q.id].checked}
                                        onChange={handleCheckboxChange}
                                    /> {q.label}
                                </label>
                                {answers[q.id].checked && (
                                    <div style={{ marginLeft: '25px', marginTop: '5px' }}>
                                        <select name={q.id} value={answers[q.id].frequency} onChange={handleFrequencyChange} required>
                                            <option value="">-- 빈도 선택 --</option>
                                            {frequencyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>
                        ))}

                        <hr />

                        {/* 2. 병력 및 약물 섹션 */}
                        <h3 className="section-title">병력 및 약물복용</h3>
                        <div className="input-group">
                            <label>기저질환 (앓고 계신 병)</label>
                            <input type="text" name="medicalHistory" value={answers.medicalHistory} onChange={handleTextChange} placeholder="예: 고혈압, 당뇨 등" />
                        </div>
                        <div className="input-group">
                            <label>복용 중인 약물</label>
                            <input type="text" name="medications" value={answers.medications} onChange={handleTextChange} placeholder="현재 드시는 약을 적어주세요" />
                        </div>
                        <div className="input-group">
                            <label>가족력</label>
                            <input type="text" name="familyHistory" value={answers.familyHistory} onChange={handleTextChange} placeholder="가족 중 유전 질환이 있나요?" />
                        </div>

                        <hr />

                        {/* 3. 증상 섹션 */}
                        <h3 className="section-title">통증 및 증상</h3>
                        <div className="input-group">
                            <label>통증 부위</label>
                            <input type="text" name="painLocation" value={answers.painLocation} onChange={handleTextChange} placeholder="어디가 아프신가요?" />
                        </div>
                        <div className="input-group">
                            <label>전신 증상 (기타)</label>
                            <textarea name="symptoms" value={answers.symptoms} onChange={handleTextChange} placeholder="기타 불편하신 증상을 자유롭게 적어주세요" rows="3" />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" style={{ width: '100%', padding: '12px', marginTop: '20px' }}>제출하기</button>
                </form>
            </div>
        </div>
    );
}