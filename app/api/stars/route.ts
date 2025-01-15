import { type NextRequest } from 'next/server';
import { filterStarsByLocation }from '@/app/utils/stars';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const la = searchParams.get('latitude');
  const lo = searchParams.get('longitude');
  const time = searchParams.get('time');

  if (!la || !lo || !time) {
    return new Response(
      JSON.stringify({ error: 'Missing required query parameters' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const latitude = parseFloat(la);
  const longitude = parseFloat(lo);
  const datetime = new Date(time);

  if (isNaN(longitude) || isNaN(latitude) || isNaN(datetime.getTime())) {
    return new Response(JSON.stringify({ error: 'Invalid query parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stars = filterStarsByLocation(latitude, longitude, datetime);

  return new Response(JSON.stringify(stars), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
