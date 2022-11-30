import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Import des composants
import NearbyShop from "../components/NearbyShop";
import { FaFacebookF } from "react-icons/fa";

// Import des fonctions
import ratings from "../functions/ratings";

const Shop = () => {
  const location = useLocation();
  const { shop } = location.state;
  const rating = ratings(shop.rating);

  const pictureArray = [];
  if (shop.pictures.length !== 0) {
    for (let i = 0; i < shop.pictures.length; i++) {
      if (pictureArray.length < 5) {
        pictureArray.push(
          <img
            src={shop.pictures[i]}
            alt={`Shop ${i}`}
            className="mosaic-item"
            key={i}
          />
        );
      }
    }
    console.log(pictureArray.length);
  } else {
    pictureArray.push(
      <img
        src={shop.thumbnail}
        alt="Shop main"
        className="front-pic"
        key={shop.thumbnail}
      />
    );
  }

  return (
    <div className="container">
      <div className="shop-container">
        <div className="shop-left-side">
          <h2>{shop.name}</h2>
          <div>{rating}</div>
          <div className="pic-management">
            <div className="pic-mosaic">{pictureArray}</div>
            {shop.pictures.length > 5 && (
              <Link
                to={`/shop/${shop.placeId}/images`}
                state={{ store: shop }}
                className="more-pics"
              >
                <FontAwesomeIcon icon="camera" color="white" />{" "}
                <span className="more-pics-text">
                  All Photos ({shop.pictures.length})
                </span>
              </Link>
            )}
          </div>

          <p className="full-desc">{shop.description}</p>
        </div>
        <div className="shop-right-side">
          <div className="map">
            <MapContainer
              center={[shop.location.lat, shop.location.lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="shop-leaflet-mini-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[shop.location.lat, shop.location.lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div>
            <FontAwesomeIcon icon="location-dot" className="heart" />
            <p className="full-address">{shop.address}</p>
          </div>
          <div>
            <FontAwesomeIcon icon="phone" className="heart" />
            <p className="phone-number">{shop.phone}</p>
          </div>
          {shop.website && (
            <div>
              <FontAwesomeIcon icon="link" className="heart" />
              <a href={shop.website}>
                {shop.website
                  .replace("http://", "")
                  .replace("www.", "")
                  .replace("/", "")}
              </a>
            </div>
          )}
          {shop.website && (
            <div>
              <FaFacebookF className="heart" />
              <a href={shop.facebook}>Facebook</a>
            </div>
          )}
          <div className="nearby">
            <h3>Nearby listings</h3>
            {shop.nearbyPlacesIds.map((placeId) => {
              return <NearbyShop key={placeId} placeId={placeId} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
