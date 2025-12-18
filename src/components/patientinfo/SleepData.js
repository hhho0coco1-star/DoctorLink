function SleepData({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>수면 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <h3>수면 기록</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>수면 시간(시간)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{d.date}</td>
              <td>{d.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SleepData;