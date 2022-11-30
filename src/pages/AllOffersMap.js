// Imports des dépendances
import { useLocation } from "react-router-dom";

// Imports de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Import des composants
import LocationCardAllOffersMap from "../components/LocationCardAllOffersMap";

const AllOffersMap = () => {
  const location = useLocation();
  const { lat, long, restaurants } = location.state;
  console.log(restaurants);
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
        </MapContainer>
      </div>
    </div>
  );
};
export default AllOffersMap;
