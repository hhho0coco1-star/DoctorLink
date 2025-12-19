function BloodSugarTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>혈당 데이터가 없습니다.</p>;
  }

  return (
    <div>
      <h3>혈당 기록</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>공복</th>
            <th>아침 전</th>
            <th>아침 후</th>
            <th>점심 전</th>
            <th>점심 후</th>
            <th>저녁 전</th>
            <th>저녁 후</th>
            <th>취침 전</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{d.date}</td>
              <td>{d.fasting}</td>
              <td>{d.beforeBreakfast}</td>
              <td>{d.afterBreakfast}</td>
              <td>{d.beforeLunch}</td>
              <td>{d.afterLunch}</td>
              <td>{d.beforeDinner}</td>
              <td>{d.afterDinner}</td>
              <td>{d.beforeSleep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BloodSugarTable;
