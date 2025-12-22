import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lifeReportData } from "../../data/dummyData";
import "./Table.css";

function LifeReportTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터
  const filteredPatients = lifeReportData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-section dashboard-goals-table-container">
      <h2>🧍 환자 라이프 리포트 결과</h2>

      <input
        type="text"
        placeholder="환자 이름으로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="dashboard-search-input"
      />

      <div className="dashboard-table-scroll-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>평균혈당(공복)</th>
              <th>평균혈압</th>
              <th>평균수면</th>
              <th>평균체중</th>
              <th>평균활동량</th>
              <th>평균칼로리</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => {
                const avgFasting =
                  patient.dummyData && patient.dummyData.length > 0
                    ? patient.dummyData.reduce((sum, d) => sum + Number(d.fasting || 0), 0) /
                      patient.dummyData.length
                    : 0;

                const avgSys =
                  patient.bloodPressureData && patient.bloodPressureData.length > 0
                    ? patient.bloodPressureData.reduce((sum, d) => sum + Number(d.systolic || 0), 0) /
                      patient.bloodPressureData.length
                    : 0;

                const avgDia =
                  patient.bloodPressureData && patient.bloodPressureData.length > 0
                    ? patient.bloodPressureData.reduce((sum, d) => sum + Number(d.diastolic || 0), 0) /
                      patient.bloodPressureData.length
                    : 0;

                const avgSleepHours =
                  patient.sleepData && patient.sleepData.length > 0
                    ? patient.sleepData.reduce((sum, d) => sum + Number(d.hours || 0), 0) /
                      patient.sleepData.length
                    : 0;

                const avgPatientSteps =
                  patient.activityData && patient.activityData.length > 0
                    ? patient.activityData.reduce((sum, d) => sum + Number(d.steps || 0), 0) /
                      patient.activityData.length
                    : 0;

                const avgPatientActivityCalories =
                  patient.activityData && patient.activityData.length > 0
                    ? patient.activityData.reduce((sum, d) => sum + Number(d.activityCalories || 0), 0) /
                      patient.activityData.length
                    : 0;

                return (
                  <tr key={patient.id}>
                    <td
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => navigate(`/patient/${patient.id}`)}
                    >
                      <strong>{patient.name}</strong>
                      <br />
                      <span style={{ fontSize: "0.85rem", color: "#666" }}>
                        {patient.phone}
                      </span>
                    </td>
                    <td>{avgFasting.toFixed(1)} mg/dL</td>
                    <td>
                      {avgSys.toFixed(1)}/{avgDia.toFixed(1)} mmHg
                    </td>
                    <td>{avgSleepHours.toFixed(1)} 시간</td>
                    <td>{patient.weight}</td>
                    <td>{avgPatientSteps.toFixed(0)} 걸음</td>
                    <td>{avgPatientActivityCalories.toFixed(0)} kcal</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">검색 결과 또는 환자 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LifeReportTable;