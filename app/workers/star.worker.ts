import {
  type Star,
  getStarPlottingDetails,
  type StarPlottingDetails,
} from '../utils/stars';

type WorkerMessage = {
  stars: Star[];
  location: {
    latitude: number;
    longitude: number;
  };
  time: Date;
};

type StarPlottingDetailsExtended = StarPlottingDetails & {
  star?: Star;
};

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { stars, location, time } = event.data;

  const starPlottingDetails = stars.map(star => {
    const plottingDetails: StarPlottingDetailsExtended = getStarPlottingDetails(
      star,
      location.latitude,
      location.longitude,
      time,
    );
    plottingDetails.star = star;
    return plottingDetails;
  });

  self.postMessage(starPlottingDetails);
};
