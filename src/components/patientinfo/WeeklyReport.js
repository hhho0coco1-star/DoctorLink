import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts";

function WeeklyReport({ data, lines, title, chartType = "line", xKey = "date" }) {
  console.log("WeeklyReport: props received - data:", data, "lines:", lines);
  return (
    <div>
      <h3>{title}</h3>
      {chartType === "line" ? (
        <>
          {/* 
            그래프에 사용되는 data는 PatientDetail에서 평균 처리되어 전달되므로,
            이 컴포넌트에서는 따로 평균계산을 하지 않습니다.
            "데이터값을 그대로 구현하는 것"처럼 보여도
            이미 props data 자체가 평균/가공된 값일 수 있으니
            실제 PatientDetail.js를 확인해 주세요.
          */}
          <div style={{ textAlign: "right", marginBottom: 5 }}>
            <span style={{ fontSize: 14, color: "#888" }}>
              {
                "※ 본 그래프는 PatientDetail에서 전달받은 가공 데이터(예: 날짜별 평균 포함)를 그대로 렌더링합니다."
              }
            </span>
          </div>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} tickMargin={10} padding={{ left: 30, right: 30 }} />
            <YAxis domain={[0, "dataMax"]} padding={{ top: 10, bottom: 10 }} />
            <Tooltip />
            <Legend />
            {/* lines 배열에 단일 dataKey 객체만 들어온다고 가정하고 하나만 렌더 */}
            {lines.length > 0 && (
              <Line
                type="monotone"
                dataKey={lines[0].dataKey}
                stroke={lines[0].color}
                name={lines[0].label}
              />
            )}
          </LineChart>
        </>
      ) : (
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend
            content={() => (
              <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center" }}>
                <li style={{ color: "#8884d8", marginRight: 10, fontWeight: "bold" }}>06:00</li>
                <li style={{ color: "#82ca9d", marginRight: 10, fontWeight: "bold" }}>12:00</li>
                <li style={{ color: "#ffc658", marginRight: 10, fontWeight: "bold" }}>18:00</li>
                <li style={{ color: "#ff586eff", marginRight: 10, fontWeight: "bold" }}>00:00</li>
              </ul>
            )}
          />
          {/* 단일 Bar에 Cell을 넣어서 timeSlot별 색상 지정 */}
          <Bar dataKey="activityCalories" name="시간대별 활동칼로리">
            {data.map((entry, index) => {
              let color;
              switch (entry.timeSlot) {
                case "06:00": color = "#8884d8"; break; // 파랑
                case "12:00": color = "#82ca9d"; break; // 초록
                case "18:00": color = "#f5a70bff"; break; // 노랑
                case "00:00": color = "#ff586eff"; break; // 빨강
                default: color = "#999999"; // 기본 회색
              }
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      )}
    </div>
  );
}

export default WeeklyReport;