import { type NextRequest } from 'next/server';
import {
  filterStarsByLocation,
  getStarPlottingDetails,
} from '@/app/utils/stars';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const la = searchParams.get('latitude');
  const lo = searchParams.get('longitude');
  const time = searchParams.get('time');

  if (!la || !lo || !time) {
    return {
      status: 400,
      body: 'Missing required query parameters',
    };
  }

  const latitude = parseFloat(la);
  const longitude = parseFloat(lo);
  const datetime = new Date(time);

  if (isNaN(longitude) || isNaN(latitude) || isNaN(datetime.getTime())) {
    return {
      status: 400,
      body: 'Invalid query parameters',
    };
  }

  const stars = filterStarsByLocation(latitude, longitude, datetime);
  const starDetails = stars.map(star =>
    getStarPlottingDetails(star, latitude, longitude, datetime),
  );

  return {
    status: 200,
    body: starDetails,
  };
}
