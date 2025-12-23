import LifeReportTable_Doctor from "./LifeReportTable_Doctor";
import { useState, useEffect } from "react";
import MainHeader from "./MainHeader_Doctor";
import { lifeReportData, drugsData } from "../data/dummyData";

function DashBoard() {
  const [allPatientGoals, setAllPatientGoals] = useState({}); // { patientId: goals }
  const [allSelectedDrugs, setAllSelectedDrugs] = useState({}); // { patientId: drugIds }

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const loadAllPatientData = () => {
      const goals = {};
      const drugs = {};
      lifeReportData.forEach(patient => {
        const savedGoals = localStorage.getItem(`patientGoals_${patient.id}`);
        if (savedGoals) {
          goals[patient.id] = JSON.parse(savedGoals);
        }
        const savedDrugs = localStorage.getItem(`selectedDrugs_${patient.id}`);
        if (savedDrugs) {
          drugs[patient.id] = JSON.parse(savedDrugs);
        }
      });
      setAllPatientGoals(goals);
      setAllSelectedDrugs(drugs);
      console.log("DashBoard: Initial load - goals:", JSON.stringify(goals, null, 2), "drugs:", JSON.stringify(drugs, null, 2)); // Debugging line
    };

    loadAllPatientData();

    const handleDashboardDataUpdated = (event) => {
      const { patientId } = event.detail;
      const savedGoals = localStorage.getItem(`patientGoals_${patientId}`);
      const savedDrugs = localStorage.getItem(`selectedDrugs_${patientId}`);
      console.log("DashBoard: Event received - patientId:", patientId, "savedGoals:", JSON.stringify(savedGoals ? JSON.parse(savedGoals) : {}, null, 2), "savedDrugs:", JSON.stringify(savedDrugs ? JSON.parse(savedDrugs) : [], null, 2)); // Debugging line

      setAllPatientGoals(prevGoals => ({ 
        ...prevGoals,
        [patientId]: savedGoals ? JSON.parse(savedGoals) : {} 
      }));
      setAllSelectedDrugs(prevDrugs => ({ 
        ...prevDrugs, 
        [patientId]: savedDrugs ? JSON.parse(savedDrugs) : [] 
      }));
    };

    window.addEventListener('dashboardDataUpdated', handleDashboardDataUpdated);
    return () => {
      window.removeEventListener('dashboardDataUpdated', handleDashboardDataUpdated);
    };
  }, []);

  useEffect(() => {
    // 모든 환자 데이터와 목표/약품 데이터를 결합하여 검색에 사용할 수 있도록 준비
    const combinedPatientData = lifeReportData.map(patient => ({
      ...patient,
      goals: allPatientGoals[patient.id],
      drugs: allSelectedDrugs[patient.id],
    }));

    const filtered = combinedPatientData.filter(patient => {
      return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPatients(filtered);
  }, [searchTerm, lifeReportData, allPatientGoals, allSelectedDrugs]); // 검색어 또는 데이터 변경 시 재실행

  return (
    <MainHeader>
      <div className="dashboard">
        {/* ✅ 상단 테이블 제거 */}

        {/* 가운데 배치: 환자 라이프 리포트 */}
        <div className="center-section">
          <LifeReportTable_Doctor />
        </div>

        {/* 하단: 모든 환자의 목표 및 처방 약품 */}
        <div className="table-section dashboard-goals-table-container">
          <h2>📊 모든 환자의 목표 및 처방 약품</h2>
          <input
            type="text"
            placeholder="환자 이름으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dashboard-search-input"
          />
          <div className="dashboard-table-scroll-container">
            <table className="data-table dashboard-goals-table">
              <thead>
                <tr>
                  <th>환자 이름</th>
                  <th>혈당 목표</th>
                  <th>혈압 목표</th>
                  <th>수면 목표</th>
                  <th>활동량 목표</th>
                  <th>처방 약품</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.goals?.bloodSugar || "-"}</td>
                      <td>{patient.goals?.bloodPressure || "-"}</td>
                      <td>{patient.goals?.sleep || "-"}</td>
                      <td>{patient.goals?.steps || "-"}</td>
                      <td>
                        {patient.drugs && patient.drugs.length > 0
                          ? patient.drugs.map(drugId => {
                              const drug = drugsData.find(d => d.id === drugId);
                              return drug ? drug.name : `알 수 없는 약품 (${drugId})`;
                            }).join(', ')
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">검색 결과 또는 환자 데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainHeader>
  );
}

export default DashBoard;