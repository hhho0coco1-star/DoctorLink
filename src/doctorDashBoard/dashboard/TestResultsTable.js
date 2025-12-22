import './Table.css';
import { testResultsData } from '../../data/dummyData';

function TestResultsTable() {
  return (
    <div className="table-section">
      <h2>🧪 방문 검사 결과</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>검사항목</th>
            <th>수치1</th>
            <th>수치2</th>
            <th>판정</th>
          </tr>
        </thead>
        <tbody>
          {testResultsData.map((result, index) => (
            <tr key={index}>
              <td>{result.item}</td>
              <td>{result.value1}</td>
              <td>{result.value2}</td>
              <td><span className="badge">{result.badge}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestResultsTable;
