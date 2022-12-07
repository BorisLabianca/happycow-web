// Import des icônes
import vegOption from "../assets/category_vegan.svg";
import healthStore from "../assets/category_health-store.svg";
import vegShop from "../assets/category_veg-shop.svg";
import bakery from "../assets/category_bakery.svg";
import hotel from "../assets/category_b-b.svg";
import delivery from "../assets/category_delivery.svg";
import catering from "../assets/category_catering.svg";
import organization from "../assets/category_organization.svg";
import foodTruck from "../assets/category_food-truck.svg";
import iceCream from "../assets/category_ice-cream.svg";
import juiceBar from "../assets/category_juice-bar.svg";
import professional from "../assets/category_vegan-professional.svg";
import other from "../assets/category_other.svg";

const restaurantTypeIcon = (cat) => {
  if (cat === 0 || cat === 11) {
    return <img src={vegOption} alt="Shop type" className="tag-icon" />;
  } else if (cat === 1) {
    return <img src={healthStore} alt="Shop type" className="tag-icon" />;
  } else if (cat === 2) {
    return <img src={vegShop} alt="Shop type" className="tag-icon" />;
  } else if (cat === 3) {
    return <img src={bakery} alt="Shop type" className="tag-icon" />;
  } else if (cat === 4) {
    return <img src={hotel} alt="Shop type" className="tag-icon" />;
  } else if (cat === 5) {
    return <img src={delivery} alt="Shop type" className="tag-icon" />;
  } else if (cat === 6) {
    return <img src={catering} alt="Shop type" className="tag-icon" />;
  } else if (cat === 7) {
    return <img src={organization} alt="Shop type" className="tag-icon" />;
  } else if (cat === 10) {
    return <img src={foodTruck} alt="Shop type" className="tag-icon" />;
  } else if (cat === 12) {
    return <img src={iceCream} alt="Shop type" className="tag-icon" />;
  } else if (cat === 13) {
    return <img src={juiceBar} alt="Shop type" className="tag-icon" />;
  } else if (cat === 14) {
    return <img src={professional} alt="Shop type" className="tag-icon" />;
  } else if (cat === 99) {
    return <img src={other} alt="Shop type" className="tag-icon" />;
  }
};

export default restaurantTypeIcon;
