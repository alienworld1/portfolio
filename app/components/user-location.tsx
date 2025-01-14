'use client';

import { useState, useEffect } from 'react';

type Location = {
  latitude: number;
  longitude: number;
};

const UserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultLocation = {
    latitude: 13.0825,
    longitude: 80.275,
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        err => {
          setError(err.message);
          setLocation(defaultLocation);
        },
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLocation(defaultLocation);
    }
  };

  useEffect(() => {
    if (!location) {
      getLocation();
    }
  });

  return (
    <div>
      {location && (
        <p>
          Your location is: {location.latitude}, {location.longitude}
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserLocation;
