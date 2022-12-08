// Imports des dépendances
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des composants
import LocationCardAllOffersMap from "../components/LocationCardAllOffersMap";
import FilterButton from "../components/FilterButton";
import SearchBar from "../components/SearchBar";

// Import des fonctions
import ratings from "../functions/ratings";
import markerIcon from "../functions/markerIcon";

// Import des JSON
import restaurantTypes from "../restaurantTypes.json";
// import restaurantSort from "../restaurantSort.json";

const AllOffersMap = ({
  latitude,
  longitude,
  suggestions,
  text,
  setText,
  onChangeHandler,
  onSuggestHandler,
  setSuggestions,
}) => {
  const location = useLocation();
  const [nameFilter, setNameFilter] = useState(
    location.state ? location.state.name : ""
  );
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [categoryButtons, setCategoryButtons] = useState(
    restaurantTypes.map((type) => {
      return false;
    })
  );
  const [sortButtons, setSortButtons] = useState([false, false, false]);
  const [params, setParams] = useState({
    category: [],
    sort: null,
    name: "",
    limit: 81,
    skip: 0,
  });
  const [limitButtons, setLimitButtons] = useState([false, false, true]);

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

  const handleLimit = (index, limitType) => {
    const newLimitButtons = [...limitButtons];
    if (index === 0) {
      newLimitButtons.splice(0, 3, true, false, false);
    } else if (index === 1) {
      newLimitButtons.splice(0, 3, false, true, false);
    } else if (index === 2) {
      newLimitButtons.splice(0, 3, false, false, true);
    }
    setLimitButtons(newLimitButtons);
    const newParams = { ...params };
    if (newParams.limit !== limitType) {
      newParams.limit = limitType;
      newParams.skip = 0;
      setParams(newParams);
    }
  };

  if (nameFilter) {
    const newParams = { ...params };
    newParams.name = nameFilter;
    setParams(newParams);
    setNameFilter("");
  }

  const handleResetFilters = () => {
    location.state.name = "";
    console.log(location.state.name);
    setNameFilter("");
    const newParams = { ...params };
    newParams.category = [];
    newParams.name = "";
    newParams.sort = null;
    const newSortButtons = [...sortButtons];
    newSortButtons.splice(0, 3, false, false, false);
    setSortButtons(newSortButtons);
    const newCategoryButtons = [
      ...categoryButtons.map((cat) => {
        return false;
      }),
    ];
    newCategoryButtons.map((cat) => {
      return false;
    });
    setCategoryButtons(newCategoryButtons);
    setParams(newParams);
  };

  const handlePrevious = () => {
    if (params.skip !== 0) {
      const newParams = { ...params };
      newParams.skip = Number(params.skip) - Number(params.limit);
      setParams(newParams);
    }
  };

  const handleNext = () => {
    if (Number(restaurants.count) - Number(params.skip) > params.limit) {
      const newParams = { ...params };
      newParams.skip = Number(params.skip) + Number(params.limit);
      setParams(newParams);
    }
  };
  // console.log(params);
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allshops", {
          params,
        });
        console.log(params);
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShops();
  }, [params]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="all-offers-map">
      <div className="shops-part">
        <SearchBar
          text={text}
          setText={setText}
          onChangeHandler={onChangeHandler}
          suggestions={suggestions}
          onSuggestHandler={onSuggestHandler}
          setSuggestions={setSuggestions}
          params={params}
          setParams={setParams}
        />
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
          <div className="reset-button" onClick={handleResetFilters}>
            Reset filters
          </div>
          <div className="pagination-div">
            <div className="limit-div">
              <div
                className={
                  limitButtons[0] === true
                    ? "limit-button-checked"
                    : "limit-button-unchecked"
                }
                onClick={() => {
                  handleLimit(0, 18);
                }}
              >
                18
              </div>
              <div
                className={
                  limitButtons[1] === true
                    ? "limit-button-checked"
                    : "limit-button-unchecked"
                }
                onClick={() => {
                  handleLimit(1, 27);
                }}
              >
                27
              </div>
              <div
                className={
                  limitButtons[2] === true
                    ? "limit-button-checked"
                    : "limit-button-unchecked"
                }
                onClick={() => {
                  handleLimit(2, 81);
                }}
              >
                81
              </div>
            </div>
            <div className="pages-div">
              <div
                onClick={handlePrevious}
                className={params.skip === 0 ? "disabled" : "prev-btn"}
              >
                Prev
              </div>
              <div className="page-count">
                {Number(params.skip) / Number(params.limit) + 1} /{" "}
                {Math.ceil(restaurants.count / restaurants.shops.length)}
              </div>
              <div onClick={handleNext} className="next-btn">
                Next
              </div>
            </div>
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
