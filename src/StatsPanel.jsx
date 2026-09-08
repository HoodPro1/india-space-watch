import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const camData = [
  { year: '2015', cams: 3 },
  { year: '2021', cams: 19 },
  { year: '2025', cams: 18 }
];

function StatsPanel() {
  return (
    <div style={{ padding: '16px', color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>India's Orbital Safety, By the Numbers</h2>
      <p style={{ textAlign: 'center' }}>
        53 operational Indian satellites &nbsp;•&nbsp; 150,000+ collision alerts received in 2025 &nbsp;•&nbsp; 18 collision-avoidance manoeuvres in 2025
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={camData}>
          <XAxis dataKey="year" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Bar dataKey="cams" fill="#4a9eff" name="Collision Avoidance Manoeuvres" />
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>
        Source: ISRO Indian Space Situational Assessment Report (ISSAR) 2025
      </p>
    </div>
  );
}

export default StatsPanel;