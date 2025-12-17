import './Table.css';
import { lifeReportData } from '../../data/dummyData';

function LifeReportTable() {
  return (
    <div className="table-section life-report">
      <table className="data-table">
        <thead>
          {/* 제목을 테이블 첫 행으로 넣기 */}
          <tr>
            <th colSpan="5" className="table-title">🧍 환자 라이프 리포트 결과</th>
          </tr>
          <tr>
            <th>이름 / 전화번호</th>
            <th>혈당</th>
            <th>혈압</th>
            <th>평균 수면시간</th>
            <th>체중</th>
          </tr>
        </thead>
        <tbody>
          {lifeReportData && lifeReportData.map((patient, index) => (
            <tr key={index}>
              <td>
                <strong>{patient.name}</strong><br />
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{patient.phone}</span>
              </td>
              <td>{patient.bloodSugar}</td>
              <td>{patient.bloodPressure}</td>
              <td>{patient.sleep}</td>
              <td>{patient.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LifeReportTable;
