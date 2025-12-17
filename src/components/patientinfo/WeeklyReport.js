import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

function WeeklyReport({ data, lines, title, chartType = "line" }) {
  return (
    <div>
      <h3>{title}</h3>
      {chartType === "line" ? (
        <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis domain={[0, 'dataMax']} padding={{ top: 10, bottom: 10 }}/>
          <Tooltip />
          <Legend />
          {lines.map((line, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.label}
            />
          ))}
        </LineChart>
      ) : (
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line, idx) => (
            <Bar
              key={idx}
              dataKey={line.dataKey}
              fill={line.color}
              name={line.label}
            />
          ))}
        </BarChart>
      )}
    </div>
  );
}

export default WeeklyReport;