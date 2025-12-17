function BloodPressureData() {
  // 더미 데이터 예시
  const bloodPressure = [
    { date: '2025-12-10', systolic: 120, diastolic: 80 },
    { date: '2025-12-11', systolic: 118, diastolic: 78 },
    { date: '2025-12-12', systolic: 122, diastolic: 82 },
  ];

  return (
    <div>
      <h3>혈압 기록</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>수축기(mmHg)</th>
            <th>이완기(mmHg)</th>
          </tr>
        </thead>
        <tbody>
          {bloodPressure.map((bp, idx) => (
            <tr key={idx}>
              <td>{bp.date}</td>
              <td>{bp.systolic}</td>
              <td>{bp.diastolic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodPressureData;
