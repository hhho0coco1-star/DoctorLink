import './Table.css';
import { testResultsData } from '../../data/dummyData';
import { useParams } from "react-router-dom";

function TestResultsTable() {
  const { id } = useParams(); // ✅ URL에서 환자 id 가져오기
  const patientId = parseInt(id);

  // ✅ 해당 환자의 검사 결과만 필터링
  const filteredResults = testResultsData.filter(
    (result) => result.patientId === patientId
  );

  return (
    <div className="table-section">
      <h2>🧪 방문 검사 결과</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>방문일자</th>
            <th>검사항목</th>
            <th>결과 수치</th>
            <th>기준치</th>
            <th>판정</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <tr key={index}>
                <td>{result.date}</td>
                <td>{result.item}</td>
                <td>{result.value1}</td>
                <td>{result.value2}</td>
                <td>
                  <span className={`badge ${result.badge}`}>
                    {result.badge}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">검사 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TestResultsTable;