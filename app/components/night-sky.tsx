'use client';

import { useMemo, useCallback, useState, useEffect, useRef, memo } from 'react';
import { useLocation } from '@/app/hooks/location';
import {
  type Star as StarType,
  type StarPlottingDetails,
} from '@/app/utils/stars';
import Star from '@/app/components/star';
import { debounce } from 'lodash';

const fetchStarsData = async (
  latitude: number,
  longitude: number,
  time: Date,
) => {
  const response = await fetch(
    `/api/stars?latitude=${latitude}&longitude=${longitude}&time=${time.toISOString()}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stars');
  }

  return response.json();
};

type StarPlottingDetailsExtended = StarPlottingDetails & {
  star: StarType;
};

const starWorker = new Worker(
  new URL('../workers/star.worker', import.meta.url),
);

const NightSky = () => {
  const { latitude, longitude } = useLocation();
  const [data, setData] = useState<StarType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const time = useMemo(() => new Date(), []);

  const debouncedFetch = useCallback(
    debounce(async (lat: number, lon: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchStarsData(lat, lon, time);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [time],
  );

  useEffect(() => {
    if (latitude && longitude) {
      debouncedFetch(latitude, longitude);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [latitude, longitude, debouncedFetch]);

  const [starPlottingDetails, setStarPlottingDetails] = useState<
    StarPlottingDetailsExtended[]
  >([]);
  const workerRef = useRef<Worker>(starWorker);

  useEffect(() => {
    if (!data) return;

    const worker = workerRef.current;

    worker.postMessage({
      stars: data,
      location: { latitude, longitude },
      time,
    });

    worker.onmessage = event => {
      setStarPlottingDetails(event.data);
    };

    return () => worker.terminate();
  }, [data, latitude, longitude, time]);

  const stars = useMemo(() => {
    if (!starPlottingDetails) return null;

    return starPlottingDetails.map(star => (
      <Star
        key={star.star.HR}
        x={star.x}
        y={star.y}
        color={star.color}
        size={star.size}
        star={star.star}
      />
    ));
  }, [starPlottingDetails]);

  return (
    <div className="h-screen bg-gradient-to-b from-black via-gray-950/95 to-slate-950/95 bg-blend-darken relative -z-10 overflow-hidden">
      {isLoading && <div>Fetching star details...</div>}
      {error && <div>Failed to fetch star details</div>}
      {stars}
    </div>
  );
};

export default memo(NightSky);
