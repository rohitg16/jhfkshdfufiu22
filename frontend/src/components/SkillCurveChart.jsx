import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

export default function SkillCurveChart({ data }) {
  const chartData = data.buckets.map(b => ({
    lead: `${b.lead_target_hours}h`,
    raw: Math.round(b.raw.mae_mw),
    corrected: Math.round(b.bias_corrected.mae_mw),
    n: b.n,
  }));

  return (
    <div className="panel">
      <h2>Forecast skill by lead time</h2>
      <p className="hint">
        How forecast error grows as forecasts are made further in advance of delivery.
        The bias-corrected series removes the fixed ~1.8 GW offset.
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="lead" label={{ value: 'Lead target', position: 'insideBottom', offset: -4 }} />
          <YAxis label={{ value: 'MAE (MW)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={v => `${v} MW`} />
          <Legend />
          <Line type="monotone" dataKey="raw" name="Raw MAE" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="corrected" name="Bias-corrected MAE" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
