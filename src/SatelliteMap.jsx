import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getSatellitePosition } from './satelliteData';
import { SATELLITE_LIST } from './satelliteList';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function approximateDistance(a, b) {
  const R = 6371;
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
      SATELLITE_LIST.forEach(sat => {
        newPositions[sat.id] = getSatellitePosition(sat.tle1, sat.tle2);
      });
      setPositions(newPositions);

      const THRESHOLD_KM = 5000;
      let flagged = null;
      for (let i = 0; i < SATELLITE_LIST.length; i++) {
        for (let j = i + 1; j < SATELLITE_LIST.length; j++) {
          const a = newPositions[SATELLITE_LIST[i].id];
          const b = newPositions[SATELLITE_LIST[j].id];
          const dist = approximateDistance(a, b);
          if (dist < THRESHOLD_KM) {
            flagged = `${SATELLITE_LIST[i].name} & ${SATELLITE_LIST[j].name} — approx ${dist.toFixed(0)} km apart`;
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
        {SATELLITE_LIST.map(sat => positions[sat.id] && (
          <Marker key={sat.id} position={[positions[sat.id].lat, positions[sat.id].lng]}>
            <Popup>
              <b>{sat.name}</b> ({sat.type})<br/>
              {positions[sat.id].alt.toFixed(0)} km altitude<br/>
              <em>{sat.purpose}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SatelliteMap;