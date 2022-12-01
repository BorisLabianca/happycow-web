import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ratings from "../functions/ratings";

const NearbyShop = ({ placeId, coords }) => {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState();

  // console.log(placeId);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/near?placeId=${placeId}`
        );
        // console.log(response.data);
        setShop(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShop();
  }, [placeId]);

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
  // let distance;
  // if (shop) {
  //   distance = Number((getDistance(coords, shop.location) / 1000).toFixed(2));
  // }

  // console.log(distance);
  return loading ? (
    <div>Loading...</div>
  ) : shop ? (
    <div className="nearby-container">
      <Link to={`/shop/${shop._id}`} className="nearby-pic-container">
        <img src={shop.thumbnail} alt="Nearby shop" className="nearby-pic" />
      </Link>
      <div className="nearby-info">
        <Link to={`/shop/${shop._id}`}>{shop.name}</Link>
        <div>{ratings(shop.rating)}</div>
        <p>{shop.address}</p>
        <p>
          {Number((getDistance(coords, shop.location) / 1000).toFixed(2))} km
        </p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default NearbyShop;
