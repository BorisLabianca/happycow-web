import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ratings from "../functions/ratings";

const LocationCardHome = ({ loc }) => {
  const rating = ratings(loc.rating);
  const location = loc.address.split(",");
  const newLocation = location.slice(location.length - 3, location.length - 1);
  // console.log(loc);
  return (
    <div className="shop-card">
      <Link to={`/shop/${loc._id}`}>
        <img src={loc.thumbnail} alt="Shop" className="shop-card-pic" />
      </Link>
      <div className="heart-container">
        <FontAwesomeIcon icon="heart" className="heart" />
      </div>
      <div className="card-info">
        <Link to={`/shop/${loc._id}`} className="shop-name-card">
          {loc.name}
        </Link>
        <p className="location">{newLocation.toString()}</p>
        <div>{rating}</div>
      </div>
      <p className="card-desc">{loc.description}</p>
    </div>
  );
};

export default LocationCardHome;
