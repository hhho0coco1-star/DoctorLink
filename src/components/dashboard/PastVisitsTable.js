import './Table.css';
import { visitsData } from '../../data/dummyData';

function PastVisitsTable() {
  return (
    <div className="table-section">
      <h2>📋 지난 진료 내역</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {visitsData.map((visit, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{visit.title1}</td>
              <td>{visit.title2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PastVisitsTable;
