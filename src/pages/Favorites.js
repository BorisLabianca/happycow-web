// Import des dépendances
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Import des composants
import FavoriteCardFavoritesPage from "../components/FavoriteCardFavoritesPage";

// Import des fonctions
import markerIcon from "../functions/markerIcon";
import ratings from "../functions/ratings";

const Favorites = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/favorites",
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
  return token ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className="favorites-main">
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
        <div className="favorites-right-part">
          <MapContainer
            center={[favorites[0].location.lat, favorites[0].location.lng]}
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
            {favorites.map((favorite) => {
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
