import { useEffect, useState } from 'react';
import './App.css';
import DecisionTimePicker from './components/DecisionTimePicker';
import MetricsCards from './components/MetricsCards';
import ForecastChart from './components/ForecastChart';
import SkillCurveChart from './components/SkillCurveChart';
import ForecastVsActualChart from './components/ForecastVsActualChart';
import { getAccuracy, getAccuracyByLeadTime, getLatestForecast, getPairs } from './api';

const DEFAULT_DECISION_TIME = '2026-01-15T10:00:00Z';

function App() {
  const [decisionTime, setDecisionTime] = useState(DEFAULT_DECISION_TIME);
  const [lookbackDays, setLookbackDays] = useState(21);
  const [leadTargetHours, setLeadTargetHours] = useState(24);

  const [forecast, setForecast] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [skillCurve, setSkillCurve] = useState(null);
  const [pairs, setPairs] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      getLatestForecast(decisionTime, 48),
      getAccuracy(decisionTime, lookbackDays, leadTargetHours),
      getAccuracyByLeadTime(decisionTime, lookbackDays),
      getPairs(decisionTime, lookbackDays, leadTargetHours),
    ])
      .then(([f, a, s, p]) => {
        if (cancelled) return;
        setForecast(f);
        setAccuracy(a);
        setSkillCurve(s);
        setPairs(p);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [decisionTime, lookbackDays, leadTargetHours]);

  return (
    <div className="app">
      <header className="hero">
        <h1>Wind Decision Portal</h1>
        <p className="subtitle">
          Day-ahead wind forecast intelligence for UK electricity procurement
        </p>
      </header>

      <DecisionTimePicker
        decisionTime={decisionTime}
        onDecisionTimeChange={setDecisionTime}
        lookbackDays={lookbackDays}
        onLookbackDaysChange={setLookbackDays}
        leadTargetHours={leadTargetHours}
        onLeadTargetHoursChange={setLeadTargetHours}
      />

      {error && <div className="error">Error: {error}</div>}
      {loading && <div className="loading">Loading data…</div>}

      {!loading && !error && (
        <>
          {accuracy && <MetricsCards accuracy={accuracy} />}
          {skillCurve && <SkillCurveChart data={skillCurve} />}
          {forecast && <ForecastChart data={forecast} />}
          {pairs && <ForecastVsActualChart data={pairs} />}
        </>
      )}

      <footer className="footer">
        <p>Data source: Elexon BMRS — FUELHH (actuals) &amp; WINDFOR (forecasts). Public API, no key required.</p>
      </footer>
    </div>
  );
}

export default App;
