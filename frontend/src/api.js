const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const getConfig = () => fetchJSON('/api/config');

export const getLatestForecast = (decisionTime, hoursAhead = 48) =>
  fetchJSON(`/api/forecast/latest?decision_time=${encodeURIComponent(decisionTime)}&hours_ahead=${hoursAhead}`);

export const getAccuracy = (decisionTime, lookbackDays = 21, leadTargetHours = 24) =>
  fetchJSON(`/api/accuracy?decision_time=${encodeURIComponent(decisionTime)}&lookback_days=${lookbackDays}&lead_target_hours=${leadTargetHours}`);

export const getAccuracyByLeadTime = (decisionTime, lookbackDays = 21) =>
  fetchJSON(`/api/accuracy/by-lead-time?decision_time=${encodeURIComponent(decisionTime)}&lookback_days=${lookbackDays}`);

export const getPairs = (decisionTime, lookbackDays = 21, leadTargetHours = 24) =>
  fetchJSON(`/api/pairs?decision_time=${encodeURIComponent(decisionTime)}&lookback_days=${lookbackDays}&lead_target_hours=${leadTargetHours}`);
