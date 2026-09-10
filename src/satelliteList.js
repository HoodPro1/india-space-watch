export const SATELLITE_LIST = [
  {
    id: 'iss',
    name: 'ISS (ZARYA)',
    type: 'Space Station',
    purpose: "International crewed research station in low Earth orbit.",
    tle1: "1 25544U 98067A   26250.17589239  .00004561  00000+0  90859-4 0  9999",
    tle2: "2 25544  51.6308 254.3052 0005020 115.4261 244.7248 15.49013499584466"
  },
  {
    id: 'cartosat3',
    name: 'Cartosat-3',
    type: 'Earth Observation (Indian)',
    purpose: "ISRO's high-resolution imaging satellite, used for mapping, urban planning, and defence surveillance.",
    tle1: "1 44804U 19081A   26252.19897876 -.00001288  00000+0 -57971-4 0  9994",
    tle2: "2 44804  97.4228 312.6750 0010586 215.1782 144.8755 15.19184608376221"
  },
  {
    id: 'cartosat2c',
    name: 'Cartosat-2C',
    type: 'Earth Observation (Indian)',
    purpose: "ISRO imaging satellite supporting cartography, disaster response, and coastal monitoring.",
    tle1: "1 41599U 16040A   26252.16905015  .00005051  00000+0  24274-3 0  9995",
    tle2: "2 41599  97.4414 310.9517 0008580 192.6800 167.4220 15.19237672566464"
  },
  
  {
    id: 'pslvdeb',
    name: 'PSLV Debris',
    type: 'Debris (Indian rocket fragment)',
    purpose: 'Fragment from a 2001 Indian PSLV launch — real, currently tracked orbital debris, not an active satellite.',
    tle1: "1 27653U 01049NQ  26245.41650934  .00001121  00000+0  11939-3 0  9998",
    tle2: "2 27653  98.0775 308.3554 0049643 235.3674 124.2857 14.90207867300809"
  },
  {
    id: 'pslvrb',
    name: 'PSLV Rocket Body',
    type: 'Debris (Indian rocket body)',
    purpose: 'Spent rocket stage from a 1999 Indian PSLV launch, still in orbit as tracked debris.',
    tle1: "1 25759U 99029D   26243.11181038  .00000139  00000-0  42924-4 0  9995",
    tle2: "2 25759  98.6088 281.0673 0027039  22.9765 337.2634 14.55865183446163"
  },
];