import { dummyData } from '../../data/dummyData'



function BloodSugarTable() {
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
          {dummyData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.fasting}</td>
              <td>{row.beforeBreakfast}</td>
              <td>{row.afterBreakfast}</td>
              <td>{row.beforeLunch}</td>
              <td>{row.afterLunch}</td>
              <td>{row.beforeDinner}</td>
              <td>{row.afterDinner}</td>
              <td>{row.beforeSleep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodSugarTable;