// Import des dépendances
import { Link } from "react-router-dom";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des fonctions
import ratings from "../functions/ratings";
import restaurantTypeIcon from "../functions/restaurantTypeIcon";

const FavoriteCardFavoritesPage = ({ favorite, handleDeleteFavorite }) => {
  //   console.log(favorite);
  const address = favorite.address.split(",");
  const newAddress = address.slice(address.length - 3, address.length - 1);

  return (
    <div className="favorite-card-profile-page">
      <div className="favorite-shop-pic-profile-page-div">
        <Link to={`/shop/${favorite.placeId}`}>
          {" "}
          <img
            src={favorite.thumbnail}
            alt="Main pic"
            className="main-pic-favorite-profile-page"
          />
        </Link>
        <div
          className="bookmark-div-profile-page"
          onClick={() => {
            handleDeleteFavorite(favorite.placeId, favorite.owner);
          }}
        >
          <FontAwesomeIcon
            icon="bookmark"
            className="bookmark-icon-profile-page"
          />
        </div>
      </div>

      <div className="favorite-profile-page-info">
        <div className="title-and-icon-div">
          <span>{restaurantTypeIcon(favorite.category)} </span>
          <h2 className="favorite-name-profile-page">{favorite.name}</h2>
        </div>
        <p className="favorite-address-profile-page">{newAddress.toString()}</p>
        <p>{ratings(favorite.rating)}</p>
      </div>
    </div>
  );
};
export default FavoriteCardFavoritesPage;
