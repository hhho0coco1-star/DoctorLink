import React from "react";
import { useNavigate } from "react-router-dom";
import { lifeReportData } from "../../data/dummyData";
import "./Table.css";

function LifeReportTable() {
  const navigate = useNavigate();

  // 평균값 계산
  const avgBloodSugar = (
    lifeReportData.reduce((sumPatients, patient) => {
      const patientAvg =
        patient.dummyData.reduce((sum, d) => sum + d.fasting, 0) /
        patient.dummyData.length;
      return sumPatients + patientAvg;
    }, 0) / lifeReportData.length
  ).toFixed(1);

  const avgSystolic = (
    lifeReportData.reduce((sumPatients, patient) => {
      if (!patient.bloodPressureData || patient.bloodPressureData.length === 0)
        return sumPatients;
      const patientAvg =
        patient.bloodPressureData.reduce((sum, d) => sum + d.systolic, 0) /
        patient.bloodPressureData.length;
      return sumPatients + patientAvg;
    }, 0) / lifeReportData.length
  ).toFixed(1);

  const avgDiastolic = (
    lifeReportData.reduce((sumPatients, patient) => {
      if (!patient.bloodPressureData || patient.bloodPressureData.length === 0)
        return sumPatients;
      const patientAvg =
        patient.bloodPressureData.reduce((sum, d) => sum + d.diastolic, 0) /
        patient.bloodPressureData.length;
      return sumPatients + patientAvg;
    }, 0) / lifeReportData.length
  ).toFixed(1);

  const avgSleep = (
    lifeReportData.reduce((sumPatients, patient) => {
      if (!patient.sleepData || patient.sleepData.length === 0) return sumPatients;
      const patientAvg =
        patient.sleepData.reduce((sum, d) => sum + d.hours, 0) /
        patient.sleepData.length;
      return sumPatients + patientAvg;
    }, 0) / lifeReportData.length
  ).toFixed(1);

  const avgWeight = (
    lifeReportData.reduce(
      (sum, p) => sum + parseInt(p.weight, 10), // "70kg" → 70
      0
    ) / lifeReportData.length
  ).toFixed(1);

  return (
    <div className="table-section life-report">
      <h2>🧍 환자 라이프 리포트 결과</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>혈당(공복 평균)</th>
            <th>혈압 평균</th>
            <th>수면 평균</th>
            <th>체중</th>
          </tr>
        </thead>
        <tbody>
          {lifeReportData.map((patient) => {
            const avgFasting =
              patient.dummyData.reduce((sum, d) => sum + d.fasting, 0) /
              patient.dummyData.length;

            const avgSys =
              patient.bloodPressureData && patient.bloodPressureData.length > 0
                ? patient.bloodPressureData.reduce(
                    (sum, d) => sum + d.systolic,
                    0
                  ) / patient.bloodPressureData.length
                : 0;

            const avgDia =
              patient.bloodPressureData && patient.bloodPressureData.length > 0
                ? patient.bloodPressureData.reduce(
                    (sum, d) => sum + d.diastolic,
                    0
                  ) / patient.bloodPressureData.length
                : 0;

            const avgSleepHours =
              patient.sleepData && patient.sleepData.length > 0
                ? patient.sleepData.reduce((sum, d) => sum + d.hours, 0) /
                  patient.sleepData.length
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
              </tr>
            );
          })}

          {/* 전체 평균 행 */}
          <tr className="avg-row">
            <td>
              <strong>전체 평균</strong>
            </td>
            <td>{avgBloodSugar} mg/dL</td>
            <td>
              {avgSystolic}/{avgDiastolic} mmHg
            </td>
            <td>{avgSleep} 시간</td>
            <td>{avgWeight} kg</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LifeReportTable;