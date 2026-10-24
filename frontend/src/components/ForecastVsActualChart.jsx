import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

export default function ForecastVsActualChart({ data }) {
  const chartData = data.pairs.map(p => ({
    time: p.startTime.slice(5, 16).replace('T', ' '),
    actual: Math.round(p.actual_mw),
    forecast: Math.round(p.forecast_mw),
    lead: Number(p.lead_hours.toFixed(1)),
  }));

  return (
    <div className="panel">
      <h2>Forecast vs actual (historical window)</h2>
      <p className="hint">
        Historical delivery periods in the lookback window. Each forecast is the version
        that was available at the chosen lead target before delivery. The persistent gap
        between the two lines is the bias seen in the metrics above.
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(v, n, p) => [`${v} MW (lead ${p.payload.lead}h)`, n]} />
          <Legend />
          <Line type="monotone" dataKey="actual" name="Actual" stroke="#1e293b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
