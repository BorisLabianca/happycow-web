// Import des dépendances
import { Link } from "react-router-dom";

// Import des composants
import ShopCarrousel from "./ShopCarrousel";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryHome = ({ lat, long, loc, cat, title }) => {
  // console.log(loc);
  return (
    <div className="category-container">
      <div className="category-top">
        <h2 className="category-title">{title}</h2>
        <div className="view-all-div">
          <Link
            to="/alloffersmap"
            state={{
              lat: lat,
              long: long,
            }}
          >
            View all
          </Link>
          <FontAwesomeIcon icon="chevron-right" className="view-all-chevron" />
        </div>
      </div>
      <ShopCarrousel loc={loc} cat={cat} />
    </div>
  );
};

export default CategoryHome;
