import { Link } from "react-router-dom";

import restaurants from "../restaurants.json";

import ratings from "../functions/ratings";

const NearbyShop = ({ placeId }) => {
  const near = restaurants.find((shop) => shop.placeId === placeId);
  console.log(near);
  const rating = ratings(near.rating);
  return (
    <div className="nearby-container">
      <Link to={`/shop/${near.placeId}`} state={{ shop: near }}>
        <img src={near.thumbnail} alt="Nearby shop" />
      </Link>
      <div>
        <Link to={`/shop/${near.placeId}`} state={{ shop: near }}>
          {near.name}
        </Link>
        <div>{rating}</div>
        <p>{near.address}</p>
      </div>
    </div>
  );
};

export default NearbyShop;