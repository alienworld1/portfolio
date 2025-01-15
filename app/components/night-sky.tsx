'use client';

import { useState, useEffect } from 'react';

import Star from './star';
import { useLocation } from '@/app/hooks/location';
import { Star as StarType } from '@/app/utils/stars';

const fetchStarsData = async (
  latitude: number,
  longitude: number,
  time: Date,
): Promise<StarType[]> => {
  const response = await fetch(
    `/api/stars?latitude=${latitude}&longitude=${longitude}&time=${time.toISOString()}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stars');
  }

  return response.json();
};

const NightSky = () => {
  const { latitude, longitude } = useLocation();
  const [data, setData] = useState<StarType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const time = new Date();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchStarsData(latitude, longitude, time)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [latitude, longitude]);

  return (
    <div className="h-screen bg-gradient-to-b from-black via-gray-950/95 to-slate-950/95 bg-blend-darken relative -z-10 overflow-hidden">
      {isLoading && <div>Fetching star details...</div>}
      {error && <div>Failed to fetch star details</div>}
      {data &&
        data.map(star => (
          <Star
            key={star.HR}
            location={{ latitude, longitude }}
            star={star}
            time={new Date()}
          />
        ))}
    </div>
  );
};

export default NightSky;
