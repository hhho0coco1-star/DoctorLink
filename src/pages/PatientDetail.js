import { useState } from "react";
import BloodSugarTable from '../components/patientinfo/BloodSugarTable';
import BloodPressureData from '../components/patientinfo/BloodPressureData';
import SleepData from '../components/patientinfo/SleepData';
import WeeklyReport from '../components/patientinfo/WeeklyReport';
import { dummyData, bloodPressureData, sleepData } from '../data/dummyData';
import MainHeader from "../header/MainHeader";
import '../components/patientinfo/Table.css';


function PatientDetail() {
  const [activeTab, setActiveTab] = useState("bloodSugar");

  return (
    <MainHeader>
      <div className="detail-page">
        <h2>환자 상세 정보</h2>

        {/* 탭 버튼 */}
        <div className="tabs">
          <button
            className={activeTab === "bloodSugar" ? "active" : ""}
            onClick={() => setActiveTab("bloodSugar")}
          >
            혈당
          </button>
          <button
            className={activeTab === "bloodPressure" ? "active" : ""}
            onClick={() => setActiveTab("bloodPressure")}
          >
            혈압
          </button>
          <button
            className={activeTab === "sleep" ? "active" : ""}
            onClick={() => setActiveTab("sleep")}
          >
            수면
          </button>
        </div>

        {/* 탭 내용 */}
        <div className="tab-content">
          {activeTab === "bloodSugar" && (
            <div>
              <WeeklyReport
                data={dummyData}
                title="혈당 그래프"
                lines={[
                  { dataKey: "fasting", color: "#8884d8", label: "공복" },
                  { dataKey: "beforeBreakfast", color: "#82ca9d", label: "아침 전" },
                  { dataKey: "afterBreakfast", color: "#ffc658", label: "아침 후" },
                  { dataKey: "beforeLunch", color: "#9cdd23ff", label: "점심 전" },
                  { dataKey: "afterLunch", color: "#d7e60cff", label: "점심 후" },
                  { dataKey: "beforeDinner", color: "#1ee60cff", label: "저녁 전" },
                  { dataKey: "afterDinner", color: "#220ce6ff", label: "저녁 후" },
                  { dataKey: "beforeSleep", color: "#c20ce6ff", label: "취침 전" },
                ]}

              />
              <BloodSugarTable data={dummyData} />
            </div>
          )}

          {activeTab === "bloodPressure" && (
            <div>
              <WeeklyReport
                data={bloodPressureData}
                title="혈압 그래프"
                lines={[
                  { dataKey: "systolic", color: "#ff7300", label: "수축기" },
                  { dataKey: "diastolic", color: "#387908", label: "이완기" },
                ]}
                chartType="bar"
              />

              <BloodPressureData data={bloodPressureData} />


            </div>
          )}

          {activeTab === "sleep" && (
            <div>
              <WeeklyReport
                data={sleepData}
                title="수면 그래프"
                lines={[
                  { dataKey: "hours", color: "#0088fe", label: "수면 시간" },
                ]}
              />
              <SleepData />
            </div>
          )}
        </div>
      </div>
    </MainHeader>
  );
}

export default PatientDetail;