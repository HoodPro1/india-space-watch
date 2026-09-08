import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getSatellitePosition } from './satelliteData';

const SATELLITES = [
  {
    id: 'iss',
    name: 'ISS (ZARYA)',
    tle1: "1 25544U 98067A   26250.17589239  .00004561  00000+0  90859-4 0  9999",
    tle2: "2 25544  51.6308 254.3052 0005020 115.4261 244.7248 15.49013499584466"
  },
  {
    id: 'hst',
    name: 'Hubble Space Telescope',
    tle1: "1 20580U 90037B   26250.65786703  .00004991  00000+0  15159-3 0  9997",
    tle2: "2 20580  28.4722 236.5531 0001578 347.2124  12.8432 15.31576828801220"
  },
  {
    id: 'noaa19',
    name: 'NOAA 19',
    tle1: "1 33591U 09005A   26250.94141218  .00000002  00000+0  24824-4 0  9995",
    tle2: "2 33591  98.9454 321.8484 0014306 152.6498 207.5430 14.13484943906176"
  }
];

// Approximate straight-line distance between two points (surface + altitude), in km
function approximateDistance(a, b) {
  const R = 6371; // Earth radius in km
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  const surfaceDist = 2 * R * Math.asin(Math.sqrt(h));
  const altDiff = Math.abs(a.alt - b.alt);
  return Math.sqrt(surfaceDist**2 + altDiff**2);
}

function SatelliteMap() {
  const [positions, setPositions] = useState({});
  const [closeApproach, setCloseApproach] = useState(null);

  useEffect(() => {
    function updateAll() {
      const newPositions = {};
      SATELLITES.forEach(sat => {
        newPositions[sat.id] = getSatellitePosition(sat.tle1, sat.tle2);
      });
      setPositions(newPositions);

      // Check distance between every pair, flag if under threshold
      const THRESHOLD_KM = 5000; // wide threshold on purpose so you'll actually see a flag trigger for the demo
      let flagged = null;
      for (let i = 0; i < SATELLITES.length; i++) {
        for (let j = i + 1; j < SATELLITES.length; j++) {
          const a = newPositions[SATELLITES[i].id];
          const b = newPositions[SATELLITES[j].id];
          const dist = approximateDistance(a, b);
          if (dist < THRESHOLD_KM) {
            flagged = `${SATELLITES[i].name} & ${SATELLITES[j].name} — approx ${dist.toFixed(0)} km apart`;
          }
        }
      }
      setCloseApproach(flagged);
    }
    updateAll();
    const interval = setInterval(updateAll, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {closeApproach && (
        <div style={{ background: '#7a1f1f', color: 'white', padding: '10px', textAlign: 'center' }}>
          ⚠️ Close approach detected: {closeApproach}
        </div>
      )}
      <MapContainer center={[20.5937, 78.9629]} zoom={3} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {SATELLITES.map(sat => positions[sat.id] && (
          <Marker key={sat.id} position={[positions[sat.id].lat, positions[sat.id].lng]}>
            <Popup>{sat.name} — {positions[sat.id].alt.toFixed(0)} km altitude</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SatelliteMap;