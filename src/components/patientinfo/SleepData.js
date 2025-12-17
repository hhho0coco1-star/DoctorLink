import { sleepData } from '../../data/dummyData'

function SleepData() {
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
          {sleepData.map((sleep, idx) => (
            <tr key={idx}>
              <td>{sleep.date}</td>
              <td>{sleep.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SleepData;