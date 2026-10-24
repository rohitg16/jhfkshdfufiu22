import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

export default function ForecastChart({ data }) {
  const chartData = data.forecasts.map(f => ({
    time: f.startTime.slice(5, 16).replace('T', ' '),
    mw: Math.round(f.forecast_mw),
    lead: Number(f.lead_hours.toFixed(1)),
  }));

  return (
    <div className="panel">
      <h2>Latest available forecast (delivery day ahead)</h2>
      <p className="hint">
        The {data.count} hourly forecasts that were available at the chosen decision time,
        for delivery periods in the following 48 hours. This is exactly what the trading desk
        sees at the moment of purchase.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis label={{ value: 'Forecast (MW)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(v, n, p) => [`${v} MW (lead ${p.payload.lead}h)`, 'Forecast']} />
          <Line type="monotone" dataKey="mw" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
