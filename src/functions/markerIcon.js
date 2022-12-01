import { Icon } from "leaflet";

// Import des icônes
import vegOption from "../assets/vegan_marker.svg";
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

export default markerIcon;
