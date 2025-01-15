import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  error: string | null;
}

const defaultLocation = {
  latitude: 13.0825,
  longitude: 80.275,
  error: null,
};

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>(defaultLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation is not supported' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => {
        setLocation(prev => ({ ...prev, error: error.message }));
      },
    );
  }, []);

  return location;
};
