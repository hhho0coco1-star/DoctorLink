// components/patientinfo/GoalManagementBox.js
import React, { useState } from "react";
import "./Table.css";
import { drugsData } from '../../data/dummyData';

function GoalManagementBox({ goals, patientId, onSave }) {
    // goals: { bloodSugar: number, bloodPressure: string, sleep: number, steps: number }
    const [currentGoals, setCurrentGoals] = useState(goals);
    const [selectedDrugs, setSelectedDrugs] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedDrugs((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        // 부모 컴포넌트로 전달
        if (typeof onSave === "function") {
            onSave(currentGoals, selectedDrugs);
        }

        // ✅ localStorage에 저장 (환자별로 구분)
        try {
            const goalsKey = `patientGoals_${patientId}`;
            const drugsKey = `selectedDrugs_${patientId}`;

            localStorage.setItem(goalsKey, JSON.stringify(currentGoals));
            localStorage.setItem(drugsKey, JSON.stringify(selectedDrugs));
            window.dispatchEvent(new CustomEvent('dashboardDataUpdated', { detail: { patientId } }));

            console.log("GoalManagementBox: Saved to localStorage:", {
                goals: currentGoals,
                drugs: selectedDrugs,
            });
            alert("목표가 저장되었습니다!");
        } catch (error) {
            console.error("Failed to save goal to localStorage", error);
        }
    };

    const handleChange = (key, value) => {
        setCurrentGoals((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="goal-box">
            <h3>🎯 목표 관리</h3>
            <div className="goal-item">
                <label>혈당 목표:</label>
                <input
                    type="number"
                    value={currentGoals.bloodSugar}
                    onChange={(e) => handleChange("bloodSugar", e.target.value)}
                />
            </div>
            <div className="goal-item">
                <label>혈압 목표:</label>
                <input
                    type="text"
                    value={currentGoals.bloodPressure}
                    onChange={(e) => handleChange("bloodPressure", e.target.value)}
                />
            </div>
            <div className="goal-item">
                <label>수면 목표(시간):</label>
                <input
                    type="number"
                    value={currentGoals.sleep}
                    onChange={(e) => handleChange("sleep", e.target.value)}
                />
            </div>
            <div className="goal-item">
                <label>활동량 목표(kcal):</label>
                <input
                    type="number"
                    value={currentGoals.steps}
                    onChange={(e) => handleChange("steps", e.target.value)}
                />
            </div>
            <button className="save-btn" onClick={handleSave}>저장</button>

            {/* 약품 선택 */}
            <div className="prescription-box">
                <h2>💊 처방 약 조회</h2>
                <label className="section-label">약품 선택</label>

                <div className="scroll-box">
                    {drugsData && drugsData.length > 0 ? (
                        drugsData.map((drug) => (
                            <div key={drug.id} className="checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={selectedDrugs.includes(drug.id)}
                                    onChange={() => handleCheckboxChange(drug.id)}
                                />
                                <span className="drug-name">{drug.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>약품 데이터가 없습니다.</p>
                    )}
                </div>

                <div className="selected-list">
                    <strong>선택된 약품:</strong>
                    {selectedDrugs.length > 0 ? (
                        <ul>
                            {selectedDrugs.map((id) => {
                                const drug = drugsData.find((d) => d.id === id);
                                return <li key={id}>{drug?.name}</li>;
                            })}
                        </ul>
                    ) : (
                        <p>선택된 약품이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GoalManagementBox;
