// Import des dépendances
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Import des composants
import FavoriteCardFavoritesPage from "../components/FavoriteCardFavoritesPage";

// Import des fonctions
import markerIcon from "../functions/markerIcon";
import ratings from "../functions/ratings";

const Favorites = ({ token, latitude, longitude }) => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://site--happycow-backend--67k4ycyfnl9b.code.run/user/favorites",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFavorites();
  }, [token]);

  // console.log(favorites);
  return token ? (
    loading ? (
      <div className="loader-div">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    ) : (
      <div className="favorites-main">
        {favorites.length > 0 ? (
          <div className="favorites-left-part">
            {favorites.map((favorite) => {
              return (
                <FavoriteCardFavoritesPage
                  key={favorite._id}
                  favorite={favorite}
                />
              );
            })}
          </div>
        ) : (
          <div className="favorites-left-part-empty">
            Vous n'avez pas encore de favoris.
          </div>
        )}
        <div className="favorites-right-part">
          <MapContainer
            center={
              favorites.length > 0
                ? [favorites[0].location.lat, favorites[0].location.lng]
                : [latitude, longitude]
            }
            zoom={13}
            scrollWheelZoom={false}
            className="map-favorites"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
            {favorites.length > 0 &&
              favorites.map((favorite) => {
                return (
                  <Marker
                    position={[favorite.location.lat, favorite.location.lng]}
                    icon={markerIcon(favorite.category)}
                    key={favorite.placeId}
                  >
                    <Popup maxWidth={300} className="map-popup">
                      <Link to={`/shop/${favorite._id}`}>
                        {favorite.thumbnail !==
                        "https://www.happycow.net/img/no-image.jpg" ? (
                          <img
                            src={favorite.thumbnail}
                            alt="Shop"
                            width={130}
                            className="shop-card-pic-top"
                          />
                        ) : (
                          <img
                            src="https://res.cloudinary.com/dbe27rnpk/image/upload/v1669731791/happycow/broken_link_vyoton.png"
                            alt="Filler"
                          />
                        )}
                        <p>{favorite.name}</p>
                        <div>{ratings(favorite.rating)}</div>
                        <p>{favorite.address}</p>
                        <p>{favorite.phone}</p>
                      </Link>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};
export default Favorites;
