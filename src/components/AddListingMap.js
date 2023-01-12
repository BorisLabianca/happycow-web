import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIcon from "../functions/markerIcon";

const AddListingMap = ({ coords, shopType }) => {
  return (
    <div className="add-listing-map">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={16}
        scrollWheelZoom={false}
        className="main-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[coords.lat, coords.lng]}
          icon={markerIcon(shopType.category)}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default AddListingMap;
