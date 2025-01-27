'use client';

import dynamic from 'next/dynamic';

const NightSky = dynamic(() => import('@/app/components/night-sky'), {
  ssr: false,
});

export default function NightSkyWrapper() {
  return (
    <>
      <NightSky />
    </>
  );
}
