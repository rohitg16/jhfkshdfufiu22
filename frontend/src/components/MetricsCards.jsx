export default function MetricsCards({ accuracy }) {
  const { raw, bias_corrected: corrected, n } = accuracy.metrics;
  const rawMae = raw?.mae_mw ?? 0;
  const corMae = corrected?.mae_mw ?? 0;
  const reduction = rawMae > 0 ? ((rawMae - corMae) / rawMae) * 100 : 0;

  return (
    <div className="panel">
      <h2>Forecast accuracy (lead ≈ {accuracy.lead_target_hours}h)</h2>
      <p className="hint">
        {n} hourly forecast / actual pairs in the {accuracy.window_start.slice(0, 10)} → {accuracy.window_end.slice(0, 10)} window.
      </p>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="label">Raw MAE</div>
          <div className="value">{raw.mae_mw.toFixed(0)}<small>MW</small></div>
        </div>
        <div className="metric-card">
          <div className="label">Raw RMSE</div>
          <div className="value">{raw.rmse_mw.toFixed(0)}<small>MW</small></div>
        </div>
        <div className="metric-card">
          <div className="label">Raw bias</div>
          <div className="value">{raw.bias_mw.toFixed(0)}<small>MW</small></div>
        </div>
        <div className="metric-card">
          <div className="label">Raw MAPE</div>
          <div className="value">{raw.mape_pct?.toFixed(1)}<small>%</small></div>
        </div>
        <div className="metric-card">
          <div className="label">Bias-corrected MAE</div>
          <div className="value">{corrected.mae_mw.toFixed(0)}<small>MW</small></div>
          <div className="delta">−{reduction.toFixed(0)}% vs raw</div>
        </div>
        <div className="metric-card">
          <div className="label">Bias-corrected RMSE</div>
          <div className="value">{corrected.rmse_mw.toFixed(0)}<small>MW</small></div>
        </div>
      </div>
      <div className="metrics-note">
        Raw forecasts over-forecast by ≈{raw.bias_mw.toFixed(0)} MW on average. This is likely
        embedded (behind-the-meter) wind that FUELHH does not meter. Correcting for this fixed
        offset reduces MAE from {raw.mae_mw.toFixed(0)} MW to {corrected.mae_mw.toFixed(0)} MW.
      </div>
    </div>
  );
}
