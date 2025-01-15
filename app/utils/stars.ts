// Dataset from https://brettonw.github.io/YaleBrightStarCatalog/bsc5-short.json
import stars from '@/app/data/bsc5-short.json';

function parseDeclination(dec: string): number {
  const parts = dec.split(' ');
  const degrees = parseInt(parts[0]);
  const minutes = parseInt(parts[1].replace('′', ''));
  const seconds = parseFloat(parts[2]?.replace('"', '') || '0');

  return degrees + minutes / 60 + seconds / 3600;
}

function parseRA(ra: string): number {
  const parts = ra.split(' ');
  const hours = parseInt(parts[0].replace('h', ''));
  const minutes = parseInt(parts[1].replace('m', ''));
  const seconds = parseFloat(parts[2].replace('s', ''));

  return (hours + minutes / 60 + seconds / 3600) * 15;
}

function isStarVisible(
  latitude: number,
  longitude: number,
  datetime: Date,
  decStr: string,
  raStr: string,
): boolean {
  // Convert coordinates to decimal degrees
  const dec = parseDeclination(decStr);
  const ra = parseRA(raStr);

  // Calculate Local Sidereal Time (LST)
  const utc = datetime.getUTCHours() + datetime.getUTCMinutes() / 60;
  const days =
    (datetime.getTime() - Date.UTC(2000, 0, 1)) / (1000 * 60 * 60 * 24);
  const lst = (100.46 + 0.985647 * days + longitude + 15 * utc) % 360;

  // Calculate hour angle
  const ha = lst - ra;

  // Calculate altitude
  const sinAlt =
    Math.sin((dec * Math.PI) / 180) * Math.sin((latitude * Math.PI) / 180) +
    Math.cos((dec * Math.PI) / 180) *
      Math.cos((latitude * Math.PI) / 180) *
      Math.cos((ha * Math.PI) / 180);
  const altitude = (Math.asin(sinAlt) * 180) / Math.PI;

  // Star is visible if altitude > 0 (above horizon)
  return altitude > 0;
}

export function filterStarsByLocation(
  latitude: number,
  longitude: number,
  time: Date,
): Star[] {
  return stars.filter(star => {
    return isStarVisible(latitude, longitude, time, star.Dec, star.RA);
  });
}

export type Star = (typeof stars)[0];

type Color = {
  red: number;
  green: number;
  blue: number;
};

function getStarColor(star: Star): Color {
  // Simplified approximation based on star temperature
  const t = parseInt(star.K ?? '5000');
  const temperature = isNaN(t) ? 5000 : t;

  if (temperature > 28000) {
    return { red: 157, green: 180, blue: 255 }; // Blue
  } else if (temperature > 10000) {
    return { red: 170, green: 191, blue: 255 }; // Blue-white
  } else if (temperature > 7500) {
    return { red: 249, green: 245, blue: 255 }; // White
  } else if (temperature > 6000) {
    return { red: 255, green: 244, blue: 234 }; // Yellow-white
  } else if (temperature > 5000) {
    return { red: 255, green: 210, blue: 161 }; // Yellow
  } else if (temperature > 3500) {
    return { red: 255, green: 204, blue: 111 }; // Orange
  } else {
    return { red: 255, green: 146, blue: 61 }; // Red
  }
}

function getStarSize(star: Star): number {
  // Convert visual magnitude to a pixel size
  // Brighter stars (lower magnitude) should appear larger
  const magnitude = parseFloat(star.V);
  if (isNaN(magnitude)) return 1;

  // Scale from roughly 1-4 pixels
  // Magnitude typically ranges from -1 (brightest) to 6 (dimmest)
  return Math.max(4 - (magnitude + 1) / 2, 1);
}

export function getStarPlottingDetails(
  star: Star,
  latitude: number,
  longitude: number,
  time: Date,
): { x: number; y: number; color: Color; size: number } {
  const dec = parseDeclination(star.Dec);
  const ra = parseRA(star.RA);

  const utc = time.getUTCHours() + time.getUTCMinutes() / 60;
  const days = (time.getTime() - Date.UTC(2000, 0, 1)) / (1000 * 60 * 60 * 24);
  const lst = (100.46 + 0.985647 * days + longitude + 15 * utc) % 360;
  const ha = lst - ra;

  const sinAlt =
    Math.sin((dec * Math.PI) / 180) * Math.sin((latitude * Math.PI) / 180) +
    Math.cos((dec * Math.PI) / 180) *
      Math.cos((latitude * Math.PI) / 180) *
      Math.cos((ha * Math.PI) / 180);
  const altitude = (Math.asin(sinAlt) * 180) / Math.PI;

  const sinAz =
    (Math.cos((dec * Math.PI) / 180) * Math.sin((ha * Math.PI) / 180)) /
    Math.cos((altitude * Math.PI) / 180);
  const cosAz =
    (Math.sin((dec * Math.PI) / 180) -
      Math.sin((latitude * Math.PI) / 180) *
        Math.sin((altitude * Math.PI) / 180)) /
    (Math.cos((latitude * Math.PI) / 180) *
      Math.cos((altitude * Math.PI) / 180));
  let azimuth = (Math.atan2(sinAz, cosAz) * 180) / Math.PI;
  if (azimuth < 0) azimuth += 360;

  // Convert to screen coordinates (x: 0-1, y: 0-1)
  const x = azimuth / 360;
  const y = altitude / 90;

  const color = getStarColor(star);
  const size = getStarSize(star);

  return { x, y, color, size };
}
