import { filterStarsByLocation } from './utils/stars';

export default function Page() {
  const stars = filterStarsByLocation(51.5074, 0.1278, new Date());
  console.log(stars.toSpliced(10));

  return (
    <div>
      <h1 className="text-white text-3xl">My personal portfolio</h1>
      <p>Welcome to my portfolio!</p>
    </div>
  );
}
