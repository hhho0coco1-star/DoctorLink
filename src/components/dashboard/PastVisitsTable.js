import React from "react";

function PastVisitsTable({ patientHistory }) {
  return (
    <div className="patient-history">
      <h3>📜 지난 진료 내역</h3>
      {patientHistory.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>저장 시각</th>
              <th>혈당 목표</th>
              <th>혈압 목표</th>
              <th>수면 목표</th>
              <th>활동량 목표</th>
              <th>처방 약품</th>
            </tr>
          </thead>
          <tbody>
            {patientHistory.map((record, idx) => (
              <tr key={idx}>
                <td>{record.date}</td>
                <td>{record.goals.bloodSugar || "-"}</td>
                <td>{record.goals.bloodPressure || "-"}</td>
                <td>{record.goals.sleep || "-"}</td>
                <td>{record.goals.steps || "-"}</td>
                <td>
                  {record.drugs && record.drugs.length > 0
                    ? record.drugs.join(", ")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>지난 진료 내역이 없습니다.</p>
      )}
    </div>
  );
}

export default PastVisitsTable;
