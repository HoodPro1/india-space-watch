import * as SunCalc from 'suncalc';

function MoonPhase() {
  const illum = SunCalc.getMoonIllumination(new Date());
  const phaseNames = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ];
  const phaseIndex = Math.floor(illum.phase * 8) % 8;
  const phaseName = phaseNames[phaseIndex];

  return (
    <div style={{ textAlign: 'center', padding: '16px', color: 'white' }}>
      <h2>Tonight's Moon Phase</h2>
      <p>{phaseName} — {(illum.fraction * 100).toFixed(0)}% illuminated</p>
    </div>
  );
}

export default MoonPhase;