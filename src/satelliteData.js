import * as satellite from 'satellite.js';

export function getSatellitePosition(tleLine1, tleLine2) {
  const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
  const now = new Date();
  const posVel = satellite.propagate(satrec, now);
  const gmst = satellite.gstime(now);
  const geo = satellite.eciToGeodetic(posVel.position, gmst);
  return {
    lat: satellite.degreesLat(geo.latitude),
    lng: satellite.degreesLong(geo.longitude),
    alt: geo.height
  };
}