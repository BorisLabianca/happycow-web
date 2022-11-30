// Imports des dépendances
import { useLocation } from "react-router-dom";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// Import des composants
import LocationCardAllOffersMap from "../components/LocationCardAllOffersMap";

// Import des fonctions
import ratings from "../functions/ratings";

// Import des icônes
import vegOption from "../assets/veg_options_marker.svg";
import healthStore from "../assets/health_store_marker.svg";
import vegShop from "../assets/veg_shop_marker.svg";
import bakery from "../assets/bakery_marker.svg";
import hotel from "../assets/bnb_hotel_marker.svg";
import delivery from "../assets/delivery_marker.svg";
import catering from "../assets/catering_marker.svg";
import organization from "../assets/organization_marker.svg";
import foodTruck from "../assets/food_truck_marker.svg";
import iceCream from "../assets/ice_cream_marker.svg";
import juiceBar from "../assets/juice_bar_marker.svg";
import professional from "../assets/vegan_professional_marker.svg";
import other from "../assets/other_marker.svg";

const AllOffersMap = () => {
  const location = useLocation();
  const { lat, long, restaurants } = location.state;

  const markerIcon = (cat) => {
    if (cat === 0 || cat === 11) {
      const icon = new Icon({ iconUrl: vegOption });
      return icon;
    } else if (cat === 1) {
      const icon = new Icon({ iconUrl: healthStore });
      return icon;
    } else if (cat === 2) {
      const icon = new Icon({ iconUrl: vegShop });
      return icon;
    } else if (cat === 3) {
      const icon = new Icon({ iconUrl: bakery });
      return icon;
    } else if (cat === 4) {
      const icon = new Icon({ iconUrl: hotel });
      return icon;
    } else if (cat === 5) {
      const icon = new Icon({ iconUrl: delivery });
      return icon;
    } else if (cat === 6) {
      const icon = new Icon({ iconUrl: catering });
      return icon;
    } else if (cat === 7) {
      const icon = new Icon({ iconUrl: organization });
      return icon;
    } else if (cat === 10) {
      const icon = new Icon({ iconUrl: foodTruck });
      return icon;
    } else if (cat === 12) {
      const icon = new Icon({ iconUrl: iceCream });
      return icon;
    } else if (cat === 13) {
      const icon = new Icon({ iconUrl: juiceBar });
      return icon;
    } else if (cat === 14) {
      const icon = new Icon({ iconUrl: professional });
      return icon;
    } else if (cat === 99) {
      const icon = new Icon({ iconUrl: other });
      return icon;
    }
  };
  //   console.log(restaurants);
  return (
    <div className="all-offers-map">
      <div className="shops-part">
        {restaurants.map((restaurant) => {
          return (
            <LocationCardAllOffersMap
              key={restaurant.placeId}
              restaurant={restaurant}
            />
          );
        })}
      </div>
      <div className="map-part">
        <MapContainer
          center={[lat, long]}
          zoom={13}
          scrollWheelZoom={false}
          className="main-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, long]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {restaurants.map((restaurant) => {
            return (
              <Marker
                position={[restaurant.location.lat, restaurant.location.lng]}
                icon={markerIcon(restaurant.category)}
                key={restaurant.placeId}
              >
                <Popup maxWidth={300} className="map-popup">
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
