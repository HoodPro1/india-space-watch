import { useState } from 'react';
import SatelliteMap from './SatelliteMap';
import SatelliteGlobe from './SatelliteGlobe';
import StatsPanel from './StatsPanel';
import './App.css';

function App() {
  const [view, setView] = useState('2d');

  return (
    <div>
      <div className="app-header">
        <h1>🛰️ India Space Watch</h1>
        <p>Public awareness dashboard for Indian satellites &amp; orbital debris — SIH 2026</p>
        <button
          onClick={() => setView(view === '2d' ? '3d' : '2d')}
          style={{ marginTop: '10px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #4a9eff', background: 'transparent', color: '#4a9eff', cursor: 'pointer' }}
        >
          Switch to {view === '2d' ? '3D Globe' : '2D Map'}
        </button>
      </div>
      <div className="section-card">
        {view === '2d' ? <SatelliteMap /> : <SatelliteGlobe />}
      </div>
      <div className="section-card"><StatsPanel /></div>
    </div>
  );
}

export default App;