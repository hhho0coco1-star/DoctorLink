import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BloodSugarTable from "../patientDetail/patientinfo/BloodSugarTable";
import BloodPressureData from "../patientDetail/patientinfo/BloodPressureData";
import WeeklyReport from "../patientDetail/patientinfo/WeeklyReport";
import { lifeReportData } from "../data/dummyData";
import MainHeader from "../mainHeader/MainHeader";
import "../patientDetail/patientinfo/Table.css";
import SleepData from "../patientDetail/patientinfo/SleepData";
import DailyActivity from "../patientDetail/patientinfo/DailyActivity";
import GoalManagementBox from "../patientDetail/patientinfo/GoalManagementBox";
import PastVisitsTable from "../doctorDashBoard/dashboard/PastVisitsTable";
import TestResultsTable from "../doctorDashBoard/dashboard/TestResultsTable";
function groupByDateAndAverage(data) {
  const grouped = {};
  data.forEach(({ date, steps, activityCalories, activityHours }) => {
    if (!grouped[date]) {
      grouped[date] = { steps: 0, activityCalories: 0, activityHours: 0, count: 0 };
    }
    grouped[date].steps += steps;
    grouped[date].activityCalories += activityCalories;
    grouped[date].activityHours += parseFloat(activityHours);
    grouped[date].count += 1;
  });

  return Object.entries(grouped).map(([date, values]) => ({
    date,
    steps: Math.round(values.steps / values.count),
    activityCalories: Math.round(values.activityCalories / values.count),
    activityHours: (values.activityHours / values.count).toFixed(2),
  }));
}

function averageBloodSugarData(data) {
  const grouped = {};
  data.forEach(item => {
    const date = item.date;
    if (!grouped[date]) {
      grouped[date] = {
        totalBloodSugar: 0,
        itemCountForAverage: 0,
      };
    }

    const bloodSugarReadings = [
      Number(item.fasting) || 0,
      Number(item.beforeBreakfast) || 0,
      Number(item.afterBreakfast) || 0,
      Number(item.beforeLunch) || 0,
      Number(item.afterLunch) || 0,
      Number(item.beforeDinner) || 0,
      Number(item.afterDinner) || 0,
      Number(item.beforeSleep) || 0,
    ];

    const validReadings = bloodSugarReadings.filter(val => typeof val === 'number' && !isNaN(val));
    grouped[date].totalBloodSugar += validReadings.reduce((sum, current) => sum + current, 0);
    grouped[date].itemCountForAverage += validReadings.length;
  });

  return Object.entries(grouped).map(([date, values]) => ({
    date,
    dailyAverageBloodSugar: Math.round(values.totalBloodSugar / (values.itemCountForAverage || 1)),
  }));
}

function PatientDetail() {
  const [activeTab, setActiveTab] = useState("bloodSugar");
  const { id } = useParams();
  const patient = lifeReportData.find((p) => p.id === parseInt(id));

  const [currentPatientGoals, setCurrentPatientGoals] = useState(() => {
    const goalsStorageKey = `patientGoals_${id}`;
    const storedGoals = localStorage.getItem(goalsStorageKey);
    return storedGoals ? JSON.parse(storedGoals) : {
      bloodSugar: 0,
      bloodPressure: "",
      sleep: 0,
      steps: 0,
    };
  });
  const [patientHistory, setPatientHistory] = useState(() => {
    const historyKey = `patientHistory_${id}`;
    const storedHistory = localStorage.getItem(historyKey);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const handleSavePatientGoals = (newGoals, newSelectedDrugs) => {
    setCurrentPatientGoals(newGoals);
    setSelectedPatientDrugs(newSelectedDrugs);

    const historyKey = `patientHistory_${id}`;
    const newRecord = {
      goals: newGoals,
      drugs: newSelectedDrugs,
      date: new Date().toLocaleString(),
    };
    const updatedHistory = [...patientHistory, newRecord];
    setPatientHistory(updatedHistory);
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
  };


  const [selectedPatientDrugs, setSelectedPatientDrugs] = useState(() => {
    const drugsStorageKey = `selectedDrugs_${id}`;
    const storedDrugs = localStorage.getItem(drugsStorageKey);
    return storedDrugs ? JSON.parse(storedDrugs) : [];
  });



  useEffect(() => {
    const goalsStorageKey = `patientGoals_${id}`;
    const drugsStorageKey = `selectedDrugs_${id}`;
    try {
      localStorage.setItem(goalsStorageKey, JSON.stringify(currentPatientGoals));
      localStorage.setItem(drugsStorageKey, JSON.stringify(selectedPatientDrugs));
      window.dispatchEvent(new CustomEvent("dashboardDataUpdated", { detail: { patientId: id } }));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [currentPatientGoals, selectedPatientDrugs, id]);

  const activityDataWithHours = Array.isArray(patient.activityData)
    ? patient.activityData.map(d => ({
      ...d,
      activityHours: (d.steps / 6000).toFixed(2)
    }))
    : [];
  const averagedActivityData = groupByDateAndAverage(activityDataWithHours);

  if (!patient) {
    return (
      <MainHeader>
        <div className="detail-page">
          <h2>환자 정보를 찾을 수 없습니다.</h2>
        </div>
      </MainHeader>
    );
  }

  return (
    <MainHeader>
      <div className="detail-page">
        <div className="page-layout-container">
          <div className="main-details-content">
            <h2 className="patient-name">{patient.name} 상세 정보</h2>
            <div className="tabs">
              <button className={activeTab === "bloodSugar" ? "active" : ""} onClick={() => setActiveTab("bloodSugar")}>혈당</button>
              <button className={activeTab === "bloodPressure" ? "active" : ""} onClick={() => setActiveTab("bloodPressure")}>혈압</button>
              <button className={activeTab === "sleep" ? "active" : ""} onClick={() => setActiveTab("sleep")}>수면</button>
              <button className={activeTab === "activity" ? "active" : ""} onClick={() => setActiveTab("activity")}>활동량</button>
              {/* ✅ 지난 진료내역 버튼 추가 */}
              <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>지난 진료내역</button>
              {/* ✅ 방문검사 결과 버튼 추가 */}
              <button className={activeTab === "testResults" ? "active" : ""} onClick={() => setActiveTab("testResults")}>방문검사 결과</button>

            </div>

            <div className="tab-content-wrapper">
              {activeTab === "bloodSugar" && (
                <div className="tab-content">
                  <div className="content-main">
                    <WeeklyReport
                      data={averageBloodSugarData(patient.dummyData)}
                      title="혈당 그래프"
                      lines={[{ dataKey: "dailyAverageBloodSugar", color: "#8884d8", label: "일평균 혈당" }]}
                    />
                    <BloodSugarTable data={patient.dummyData} />
                  </div>
                </div>
              )}
              {activeTab === "bloodPressure" && (
                <div className="tab-content">
                  <div className="content-main">
                    <WeeklyReport
                      data={patient.bloodPressureData}
                      title="혈압 그래프"
                      xKey="date"
                      lines={[
                        { dataKey: "systolic", color: "#ff7300", label: "수축기" },
                        { dataKey: "diastolic", color: "#387908", label: "이완기" },
                      ]}
                      chartType="line"
                    />
                    <BloodPressureData patient={patient} />
                  </div>
                </div>
              )}
              {activeTab === "sleep" && (
                <div className="tab-content">
                  <div className="content-main">
                    <WeeklyReport
                      data={patient.sleepData}
                      title="수면 그래프"
                      lines={[{ dataKey: "hours", color: "#0088fe", label: "수면 시간" }]}
                    />
                    <SleepData data={patient.sleepData} />
                  </div>
                </div>
              )}
              {activeTab === "activity" && (
                <div className="tab-content">
                  <div className="content-main">
                    <WeeklyReport
                      data={activityDataWithHours}
                      title="시간대별 활동 칼로리"
                      lines={[
                        { dataKey: "06:00", color: "#8884d8", label: "06:00" },
                        { dataKey: "12:00", color: "#82ca9d", label: "12:00" },
                        { dataKey: "18:00", color: "#ffc658", label: "18:00" },
                        { dataKey: "00:00", color: "#ff586eff", label: "00:00" },
                      ]}
                      chartType="bar"
                      xKey="date"
                    />
                    <DailyActivity data={averagedActivityData} />
                  </div>
                </div>
              )}
              {activeTab === "history" && (
                <div className="tab-content">
                  <div className="content-main">
                    <PastVisitsTable patientHistory={patientHistory} />
                  </div>
                </div>
              )}
              {/* ✅ 방문검사 결과 탭 */}
              {activeTab === "testResults" && (
                <div className="tab-content">
                  <div className="content-main">
                    <TestResultsTable />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 목표 관리 박스 */}
          <GoalManagementBox
            goals={currentPatientGoals}
            patientId={id}
            onSave={handleSavePatientGoals}
          />
        </div>
      </div>
    </MainHeader>
  );
}

export default PatientDetail;