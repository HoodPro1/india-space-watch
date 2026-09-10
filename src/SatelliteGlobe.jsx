import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { getSatellitePosition } from './satelliteData';
import { SATELLITE_LIST } from './satelliteList';

function SatelliteGlobe() {
  const [points, setPoints] = useState([]);
  const globeRef = useRef();

  useEffect(() => {
    function updateAll() {
      const newPoints = SATELLITE_LIST.map(sat => {
        const pos = getSatellitePosition(sat.tle1, sat.tle2);
        return { ...pos, name: sat.name, id: sat.id };
      });
      setPoints(newPoints);
    }
    updateAll();
    const interval = setInterval(updateAll, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      pointsData={points}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={d => Math.min(d.alt / 6371, 1)}
      pointColor={() => '#e63333'}
      pointLabel="name"
      pointRadius={0.4}
      width={800}
      height={500}
    />
  );
}

export default SatelliteGlobe;