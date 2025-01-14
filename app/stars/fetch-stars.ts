import stars from './bsc5-short.json';
// Dataset from https://brettonw.github.io/YaleBrightStarCatalog/bsc5-short.json

function parseDeclination(dec: string): number {
  const parts = dec.split(' ');
  const degrees = parseInt(parts[0]);
  const minutes = parseInt(parts[1].replace('′', ''));
  const seconds = parseFloat(parts[2]?.replace('"', '') || '0');
  
  return degrees + (minutes / 60) + (seconds / 3600);
}

function parseRA(ra: string): number {
  const parts = ra.split(' ');
  const hours = parseInt(parts[0].replace('h', ''));
  const minutes = parseInt(parts[1].replace('m', ''));
  const seconds = parseFloat(parts[2].replace('s', ''));
  
  return (hours + minutes/60 + seconds/3600) * 15;
}

function isStarVisible(latitude: number, longitude: number, datetime: Date, decStr: string, raStr: string): boolean {
  // Convert coordinates to decimal degrees
  const dec = parseDeclination(decStr);
  const ra = parseRA(raStr);
  
  // Calculate Local Sidereal Time (LST)
  const utc = datetime.getUTCHours() + datetime.getUTCMinutes()/60;
  const days = (datetime.getTime() - Date.UTC(2000, 0, 1)) / (1000 * 60 * 60 * 24);
  const lst = (100.46 + 0.985647 * days + longitude + 15 * utc) % 360;
  
  // Calculate hour angle
  const ha = lst - ra;
  
  // Calculate altitude
  const sinAlt = Math.sin(dec * Math.PI/180) * Math.sin(latitude * Math.PI/180) + 
                 Math.cos(dec * Math.PI/180) * Math.cos(latitude * Math.PI/180) * 
                 Math.cos(ha * Math.PI/180);
  const altitude = Math.asin(sinAlt) * 180/Math.PI;
  
  // Star is visible if altitude > 0 (above horizon)
  return altitude > 0;
}

export function filterStarsByLocation(latitude: number, longitude: number) {
  const now = new Date();
  return stars.filter(star => {
    return isStarVisible(latitude, longitude, now, star.Dec, star.RA);
  });
}