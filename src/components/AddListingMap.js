import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "../functions/markerIcon";

const AddListingMap = ({ coords, shopType }) => {
  return (
    <div className="add-listing-map">
      <MapContainer
        center={[coords[1], coords[0]]}
        zoom={16}
        scrollWheelZoom={false}
        className="main-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[coords[1], coords[0]]}
          icon={markerIcon(shopType.category)}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default AddListingMap;
