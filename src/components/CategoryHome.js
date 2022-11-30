// Import des dépendances
import { Link } from "react-router-dom";

// Import des composants
import ShopCarrousel from "./ShopCarrousel";

const CategoryHome = ({ lat, long, loc, cat, title }) => {
  return (
    <div className="category-container">
      <h2 className="category-title">{title}</h2>
      <Link
        to="/alloffersmap"
        state={{
          lat: lat,
          long: long,
          restaurants: loc,
        }}
      >
        View all
      </Link>
      <ShopCarrousel loc={loc} cat={cat} />
    </div>
  );
};

export default CategoryHome;
