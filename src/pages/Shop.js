import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

// Import des composants
import NearbyShop from "../components/NearbyShop";
import { FaFacebookF } from "react-icons/fa";

// Import des fonctions
import ratings from "../functions/ratings";
import markerIcon from "../functions/markerIcon";
import priceClass from "../functions/priceClass";
import restaurantTypeTag from "../functions/restaurantTypeTag";

const Shop = ({ user, token, handleUser }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState();
  // console.log(id);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/shop/${id}`);
        // console.log(response.data);

        setShop(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShop();
  }, [id]);

  const mosaic = (shop) => {
    const pictureArray = [];
    if (shop.pictures.length !== 0) {
      if (shop.pictures.length === 1) {
        pictureArray.push(
          <img
            src={shop.pictures[0]}
            alt="Shop main"
            className="front-pic"
            key={shop.pictures[0]}
          />
        );
      } else {
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
      }
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
    return pictureArray;
  };

  const openingTime = (shop) => {
    const schedule = [];
    const searchTerm = "Open";
    if (shop.description) {
      if (shop.description.indexOf(searchTerm) !== -1) {
        const intermediate = shop.description.split(searchTerm);
        schedule.push(intermediate[intermediate.length - 1]);
      }
    }
    return schedule;
  };

  const handleAddToFavorite = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/addfavorite",
        {
          placeId: id,
          name: shop.name,
          address: shop.address,
          location: shop.location,
          phone: shop.phone,
          thumbnail: shop.thumbnail,
          type: shop.type,
          category: shop.category,
          rating: shop.rating,
          vegan: shop.vegan,
          vegOnly: shop.vegOnly,
          price: shop.price,
          owner: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      handleUser(response.data.userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFavorite = async () => {
    setLoading(true);
    const response = await axios.delete(
      "http://localhost:4000/user/delete-favorite",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          placeId: id,
          userId: user._id,
        },
      }
    );
    handleUser(response.data);
    setLoading(false);
  };
  // console.log(shop);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container">
      <div className="shop-container">
        <div className="shop-left-side">
          <h2>{shop.name}</h2>
          <div className="price-and-rate">
            <span>{ratings(shop.rating)}</span>
            <span>{priceClass(shop.price)}</span>
          </div>
          <div className="shop-type">
            <span>{restaurantTypeTag(shop.category, shop.type)}</span>
          </div>
          {user?.favorites?.indexOf(shop._id) === -1 ? (
            <FontAwesomeIcon
              icon="bookmark"
              color="lightgrey"
              onClick={handleAddToFavorite}
            />
          ) : (
            <FontAwesomeIcon
              icon="bookmark"
              color="#7B4EC3"
              onClick={handleDeleteFavorite}
            />
          )}
          <div className="pic-management">
            <div className="pic-mosaic">{mosaic(shop)}</div>
            {shop.pictures.length > 5 && (
              <Link
                to={`/shop/${shop._id}/images`}
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
              zoom={17}
              scrollWheelZoom={false}
              className="shop-leaflet-mini-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[shop.location.lat, shop.location.lng]}
                icon={markerIcon(shop.category)}
              ></Marker>
            </MapContainer>
          </div>
          <div className="under-map-info">
            <div className="individual-info">
              <div className="info-icon-container">
                <FontAwesomeIcon
                  icon="location-dot"
                  className="shop-info-icon"
                />
              </div>
              <p className="full-address">{shop.address}</p>
            </div>
            {shop.description !== null && (
              <div className="individual-info">
                <div className="info-icon-container">
                  <FontAwesomeIcon icon="clock" className="shop-info-icon" />
                </div>
                <p>{openingTime(shop)}</p>
              </div>
            )}
            <div className="individual-info">
              <div className="info-icon-container">
                <FontAwesomeIcon icon="phone" className="shop-info-icon" />
              </div>
              <p className="phone-number">{shop.phone}</p>
            </div>
            {shop.website && (
              <div className="individual-info">
                <div className="info-icon-container">
                  <FontAwesomeIcon icon="link" className="shop-info-icon" />
                </div>
                <a href={shop.website}>
                  {shop.website
                    .replace("http://", "")
                    .replace("www.", "")
                    .replace("/", "")}
                </a>
              </div>
            )}
            {shop.facebook && (
              <div className="individual-info">
                <div className="info-icon-container">
                  <FaFacebookF className="shop-info-icon" />
                </div>
                <a href={shop.facebook}>Facebook</a>
              </div>
            )}
          </div>

          <div className="nearby">
            <h3>Nearby listings</h3>
            {shop.nearbyPlacesIds.map((nearbyPlaceId) => {
              return (
                <NearbyShop
                  key={nearbyPlaceId}
                  placeId={nearbyPlaceId}
                  coords={shop.location}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
