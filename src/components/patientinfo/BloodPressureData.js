function BloodPressureData({ patient }) {
  const bpList = patient?.bloodPressureData || [];

  if (bpList.length === 0) {
    return <p>혈압 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <h3>{patient.name} 혈압 기록</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>수축기(mmHg)</th>
            <th>이완기(mmHg)</th>
          </tr>
        </thead>
        <tbody>
          {bpList.map((bp, idx) => (
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