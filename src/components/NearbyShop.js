import { Link } from "react-router-dom";

import restaurants from "../restaurants.json";

import ratings from "../functions/ratings";

const NearbyShop = ({ id, coords }) => {
  const near = restaurants.find((shop) => shop.placeId === id);
  // console.log(near);
  let rating;
  if (near) {
    rating = ratings(near.rating);
  }

  const toRadian = (degree) => {
    return (degree * Math.PI) / 180;
  };
  const getDistance = (origin, destination) => {
    const lon1 = toRadian(origin.lng);
    const lat1 = toRadian(origin.lat);
    const lon2 = toRadian(destination.lng);
    const lat2 = toRadian(destination.lat);
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  };
  let distance;
  if (near) {
    distance = Number((getDistance(coords, near.location) / 1000).toFixed(2));
  }

  // console.log(distance);
  return near ? (
    <div className="nearby-container">
      <Link
        to={`/shop/${near.id}`}
        state={{ shop: near }}
        className="nearby-pic-container"
      >
        <img src={near.thumbnail} alt="Nearby shop" className="nearby-pic" />
      </Link>
      <div className="nearby-info">
        <Link to={`/shop/${near.id}`} state={{ shop: near }}>
          {near.name}
        </Link>
        <div>{rating}</div>
        <p>{near.address}</p>
        <p>{distance} km</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default NearbyShop;
