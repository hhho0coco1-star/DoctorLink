function DailyActivity({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>활동 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <h3>일일 활동 기록</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>걸음 수</th>
            <th>활동 시간(시간)</th>
            <th>활동 칼로리(kcal)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{d.date}</td>
              <td>{d.steps}</td>
              <td>{d.activityHours}</td>
              <td>{d.activityCalories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailyActivity;