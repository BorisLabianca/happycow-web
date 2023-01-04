// Import des dépendances
import { Link } from "react-router-dom";

// Import des fonctions
import ratings from "../functions/ratings";
import priceClass from "../functions/priceClass";

const LocationCardAllOffersMap = ({ restaurant }) => {
  return (
    <Link
      to={`/shop/${restaurant._id}`}
      className="location-card-all-offers-map"
    >
      {restaurant.thumbnail !== "https://www.happycow.net/img/no-image.jpg" ? (
        <img
          src={restaurant.thumbnail}
          alt="Shop"
          className="shop-card-pic-top"
        />
      ) : (
        <img
          src="https://res.cloudinary.com/dbe27rnpk/image/upload/v1669731791/happycow/broken_link_vyoton.png"
          alt="Filler"
          className="shop-card-pic-top"
        />
      )}
      <p>{restaurant.name}</p>
      <span>{ratings(restaurant.rating)}</span>
      <div>{priceClass(restaurant.price)}</div>
    </Link>
  );
};

export default LocationCardAllOffersMap;
