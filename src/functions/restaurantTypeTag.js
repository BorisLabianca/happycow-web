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

const restaurantTypeTag = (cat, type) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);
  if (cat === 0 || cat === 11) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#22820E" }}
      >
        <img src={vegOption} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 1) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#B49903" }}
      >
        <img src={healthStore} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 2) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#22820E" }}
      >
        <img src={vegShop} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 3) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#9C722A" }}
      >
        {" "}
        <img src={bakery} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 4) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#1F85A2" }}
      >
        <img src={hotel} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 5) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#78AA06" }}
      >
        <img src={delivery} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 6) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#24AEA0" }}
      >
        <img src={catering} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 7) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#8E3388" }}
      >
        <img src={organization} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 10) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#B569F6" }}
      >
        <img src={foodTruck} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 12) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#EF447F" }}
      >
        <img src={iceCream} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 13) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#FBB040" }}
      >
        <img src={juiceBar} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 14) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#016639" }}
      >
        <img src={professional} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  } else if (cat === 99) {
    return (
      <div
        className="tag-rounded-corner"
        style={{ backgroundColor: "#3775C5" }}
      >
        <img src={other} alt="Shop type" className="tag-icon" />
        <span>{typeName}</span>
      </div>
    );
  }
};

export default restaurantTypeTag;
