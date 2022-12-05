// Imports des dépendances
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des composants
import LocationCardAllOffersMap from "../components/LocationCardAllOffersMap";
import FilterButton from "../components/FilterButton";

// Import des fonctions
import ratings from "../functions/ratings";
import markerIcon from "../functions/markerIcon";

// Import des JSON
import restaurantTypes from "../restaurantTypes.json";
import restaurantSort from "../restaurantSort.json";

// // Import des icônes
// import vegOption from "../assets/veg_options_marker.svg";
// import healthStore from "../assets/health_store_marker.svg";
// import vegShop from "../assets/veg_shop_marker.svg";
// import bakery from "../assets/bakery_marker.svg";
// import hotel from "../assets/bnb_hotel_marker.svg";
// import delivery from "../assets/delivery_marker.svg";
// import catering from "../assets/catering_marker.svg";
// import organization from "../assets/organization_marker.svg";
// import foodTruck from "../assets/food_truck_marker.svg";
// import iceCream from "../assets/ice_cream_marker.svg";
// import juiceBar from "../assets/juice_bar_marker.svg";
// import professional from "../assets/vegan_professional_marker.svg";
// import other from "../assets/other_marker.svg";

const AllOffersMap = ({ latitude, longitude }) => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [categoryButtons, setCategoryButtons] = useState(
    restaurantTypes.map((type) => {
      return false;
    })
  );
  const [sortButtons, setSortButtons] = useState([false, false, false]);
  const [params, setParams] = useState({ category: [], sort: null });
  const handleSort = (index, sortType) => {
    const newSortButtons = [...sortButtons];
    if (index === 0) {
      newSortButtons.splice(0, 3, !newSortButtons[0], false, false);
    } else if (index === 1) {
      newSortButtons.splice(0, 3, false, !newSortButtons[1], false);
    } else if (index === 2) {
      newSortButtons.splice(0, 3, false, false, !newSortButtons[2]);
    }
    setSortButtons(newSortButtons);
    const newParams = { ...params };
    if (
      (index === 0 && newParams.sort === sortType) ||
      (index === 1 && newParams.sort === sortType) ||
      (index === 2 && newParams.sort === sortType)
    ) {
      newParams.sort = null;
      setParams(newParams);
    } else if (newParams.sort !== sortType) {
      newParams.sort = sortType;
      setParams(newParams);
    }
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allshops", {
          params,
        });
        // console.log(response.data.shops);
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShops();
  }, [params]);

  // const markerIcon = (cat) => {
  //   if (cat === 0 || cat === 11) {
  //     const icon = new Icon({ iconUrl: vegOption });
  //     return icon;
  //   } else if (cat === 1) {
  //     const icon = new Icon({ iconUrl: healthStore });
  //     return icon;
  //   } else if (cat === 2) {
  //     const icon = new Icon({ iconUrl: vegShop });
  //     return icon;
  //   } else if (cat === 3) {
  //     const icon = new Icon({ iconUrl: bakery });
  //     return icon;
  //   } else if (cat === 4) {
  //     const icon = new Icon({ iconUrl: hotel });
  //     return icon;
  //   } else if (cat === 5) {
  //     const icon = new Icon({ iconUrl: delivery });
  //     return icon;
  //   } else if (cat === 6) {
  //     const icon = new Icon({ iconUrl: catering });
  //     return icon;
  //   } else if (cat === 7) {
  //     const icon = new Icon({ iconUrl: organization });
  //     return icon;
  //   } else if (cat === 10) {
  //     const icon = new Icon({ iconUrl: foodTruck });
  //     return icon;
  //   } else if (cat === 12) {
  //     const icon = new Icon({ iconUrl: iceCream });
  //     return icon;
  //   } else if (cat === 13) {
  //     const icon = new Icon({ iconUrl: juiceBar });
  //     return icon;
  //   } else if (cat === 14) {
  //     const icon = new Icon({ iconUrl: professional });
  //     return icon;
  //   } else if (cat === 99) {
  //     const icon = new Icon({ iconUrl: other });
  //     return icon;
  //   }
  // };
  //   console.log(restaurants);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="all-offers-map">
      <div className="shops-part">
        <div className="filter-div">
          {restaurantTypes.map((type, index) => {
            return (
              <FilterButton
                key={type.category}
                cat={type.category}
                type={type.type}
                backgroundColor={type.backgroudColor}
                icon={type.icon}
                categoryButtons={categoryButtons}
                setCategoryButtons={setCategoryButtons}
                index={index}
                params={params}
                setParams={setParams}
              />
            );
          })}
        </div>
        <div className="sort-div">
          <div
            className={
              sortButtons[0] === true
                ? "sort-button-checked"
                : "sort-button-unchecked"
            }
            onClick={() => {
              handleSort(0, "NameABC");
            }}
          >
            Name <FontAwesomeIcon icon="arrow-up-a-z" className="" />
          </div>
          <div
            className={
              sortButtons[1] === true
                ? "name-desc sort-button-checked"
                : "name-desc sort-button-unchecked"
            }
            onClick={() => {
              handleSort(1, "NameCBA");
            }}
          >
            Name <FontAwesomeIcon icon="arrow-down-z-a" className="" />
          </div>
          <div
            className={
              sortButtons[2] === true
                ? "rating-desc sort-button-checked"
                : "rating-desc sort-button-unchecked"
            }
            onClick={() => {
              handleSort(2, "RatingCBA");
            }}
          >
            Rating <FontAwesomeIcon icon="arrow-down-long" className="" />
          </div>
        </div>
        <div className="shop-cards-div">
          {restaurants.shops.map((restaurant) => {
            return (
              <LocationCardAllOffersMap
                key={restaurant.placeId}
                restaurant={restaurant}
              />
            );
          })}
        </div>
      </div>
      <div className="map-part">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="main-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {restaurants.shops.map((restaurant) => {
            return (
              <Marker
                position={[restaurant.location.lat, restaurant.location.lng]}
                icon={markerIcon(restaurant.category)}
                key={restaurant.placeId}
              >
                <Popup maxWidth={300} className="map-popup">
                  <Link to={`/shop/${restaurant._id}`}>
                    {restaurant.thumbnail !==
                    "https://www.happycow.net/img/no-image.jpg" ? (
                      <img
                        src={restaurant.thumbnail}
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
                    <p>{restaurant.name}</p>
                    <div>{ratings(restaurant.rating)}</div>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.phone}</p>
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
export default AllOffersMap;
