'use client';

import { useState, useEffect, useRef } from 'react';

import { useLocation } from '@/app/hooks/location';
import { Star as StarType, getStarPlottingDetails } from '@/app/utils/stars';

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const time = new Date();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchStarsData(latitude, longitude, time)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [latitude, longitude]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const starDetails = data.map(star =>
      getStarPlottingDetails(star, latitude, longitude, time),
    );

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starDetails.forEach(star => {
        // The twinkle effect is not too smooth
        // go over this later
        const brightness = Math.random() * 0.5 + 0.5;
        const twinkleColor =
          `rgba(${star.color.red}, ` +
          `${star.color.green}, ${star.color.blue}, ${brightness})`;

        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size,
          0,
          2 * Math.PI,
        );
        ctx.fillStyle = twinkleColor;
        ctx.fill();
      });
    };

    const animate = () => {
      drawStars();
      return requestAnimationFrame(animate);
    };

    const handle = animate();

    return () => cancelAnimationFrame(handle);
  }, [data]);

  return (
    <div className="h-screen bg-gradient-to-b from-black via-gray-950/95 to-slate-950/95 bg-blend-darken relative -z-10 overflow-hidden">
      {isLoading && <div>Fetching star details...</div>}
      {error && <div>Failed to fetch star details</div>}
      {data && (
        <canvas
          ref={canvasRef}
          width={windowSize.width}
          height={windowSize.height}
          className="fixed top-0 left-0 -z-10bg-gradient-to-b from-black via-gray-950/95 to-slate-950/95 bg-blend-darken h-full w-full"
        />
      )}
    </div>
  );
};

export default NightSky;
