export default function DecisionTimePicker({
  decisionTime, onDecisionTimeChange,
  lookbackDays, onLookbackDaysChange,
  leadTargetHours, onLeadTargetHoursChange,
}) {
  return (
    <div className="panel">
      <h2>Decision context</h2>
      <p className="hint">
        Choose the point in time when the utility makes its day-ahead purchase decision.
        All analysis below uses only forecasts published <strong>on or before</strong> this time.
      </p>
      <div className="picker">
        <label>
          Decision time (UTC)
          <input
            type="datetime-local"
            value={decisionTime.slice(0, 16)}
            onChange={e => onDecisionTimeChange(`${e.target.value}:00Z`)}
          />
        </label>
        <label>
          Lookback window (days)
          <input
            type="number" min="1" max="60"
            value={lookbackDays}
            onChange={e => onLookbackDaysChange(Number(e.target.value))}
          />
        </label>
        <label>
          Lead target (hours before delivery)
          <select
            value={leadTargetHours}
            onChange={e => onLeadTargetHoursChange(Number(e.target.value))}
          >
            <option value={6}>6h</option>
            <option value={12}>12h</option>
            <option value={18}>18h</option>
            <option value={24}>24h (day-ahead)</option>
            <option value={36}>36h</option>
            <option value={48}>48h</option>
          </select>
        </label>
      </div>
    </div>
  );
}
