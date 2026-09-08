import SatelliteMap from './SatelliteMap';
import MoonPhase from './MoonPhase';
import StatsPanel from './StatsPanel';
import './App.css';

function App() {
  return (
    <div>
      <div className="app-header">
        <h1>🛰️ India Space Watch</h1>
        <p>Public awareness dashboard for Indian satellites &amp; orbital debris — SIH 2026</p>
      </div>
      <div className="section-card"><MoonPhase /></div>
      <div className="section-card"><SatelliteMap /></div>
      <div className="section-card"><StatsPanel /></div>
    </div>
  );
}

export default App;